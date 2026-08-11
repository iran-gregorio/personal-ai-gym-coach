import { prisma } from '../../prisma';

export class ExecutionService {
  async startWorkout(userId: string, workoutId: string, clientExecutedAt?: string) {
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: { exercises: true },
    });

    if (!workout) {
      throw new Error('Workout not found');
    }

    if (workout.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Check for an ongoing execution (duration = 0 means not finished)
    // Only look for ones created today to be safe
    let startOfDay = new Date();
    if (clientExecutedAt) {
      startOfDay = new Date(clientExecutedAt);
    }
    startOfDay.setUTCHours(0, 0, 0, 0);

    const ongoing = await prisma.workoutHistory.findFirst({
      where: {
        userId,
        workoutId,
        durationSeconds: 0,
        executedAt: {
          gte: startOfDay,
        }
      },
      include: {
        exercises: { orderBy: { order: 'asc' } },
      },
    });

    if (ongoing) {
      return ongoing;
    }

    const executedAtDate = clientExecutedAt ? new Date(clientExecutedAt) : new Date();

    // Create the history
    const history = await prisma.workoutHistory.create({
      data: {
        userId,
        workoutId,
        workoutDescriptionSnapshot: workout.description,
        executedAt: executedAtDate,
        durationSeconds: 0,
        exercises: {
          create: workout.exercises.map((ex) => ({
            exerciseId: ex.id,
            nameSnapshot: ex.name,
            setsSnapshot: ex.sets,
            repsSnapshot: ex.reps,
            weightUsed: ex.lastWeight || null,
            isCompleted: false,
            order: ex.order,
          })),
        },
      },
      include: {
        exercises: true,
      },
    });

    return history;
  }

  async getExecution(userId: string, historyId: string) {
    const history = await prisma.workoutHistory.findUnique({
      where: { id: historyId },
      include: { exercises: { orderBy: { order: 'asc' } } },
    });

    if (!history) {
      throw new Error('History not found');
    }

    if (history.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return history;
  }

  async updateExercise(userId: string, historyExerciseId: string, isCompleted?: boolean, weightUsed?: string) {
    const exercise = await prisma.workoutHistoryExercise.findUnique({
      where: { id: historyExerciseId },
      include: { history: true },
    });

    if (!exercise || exercise.history.userId !== userId) {
      throw new Error('Unauthorized or not found');
    }

    const dataToUpdate: any = {};
    if (isCompleted !== undefined) dataToUpdate.isCompleted = isCompleted;
    if (weightUsed !== undefined) dataToUpdate.weightUsed = weightUsed;

    const updated = await prisma.workoutHistoryExercise.update({
      where: { id: historyExerciseId },
      data: dataToUpdate,
    });

    return updated;
  }

  async finishWorkout(userId: string, historyId: string, clientFinishedAt?: string) {
    const history = await prisma.workoutHistory.findUnique({
      where: { id: historyId },
    });

    if (!history || history.userId !== userId) {
      throw new Error('Unauthorized or not found');
    }

    const now = clientFinishedAt ? new Date(clientFinishedAt) : new Date();
    const durationSeconds = Math.max(1, Math.floor((now.getTime() - history.executedAt.getTime()) / 1000));

    const updated = await prisma.workoutHistory.update({
      where: { id: historyId },
      data: {
        durationSeconds,
      },
    });

    // Also update the lastWeight on WorkoutExercise for convenience next time
    const exercises = await prisma.workoutHistoryExercise.findMany({
      where: { historyId },
    });

    for (const ex of exercises) {
      if (ex.exerciseId && ex.weightUsed) {
        await prisma.workoutExercise.update({
          where: { id: ex.exerciseId },
          data: { lastWeight: ex.weightUsed },
        });
      }
    }

    return updated;
  }
}

export const executionService = new ExecutionService();
