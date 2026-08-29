import { prisma } from '../../prisma';

export class WorkoutsService {
  async getAllWorkouts(userId: string) {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
      include: {
        exercises: {
          orderBy: { order: 'asc' },
        },
      },
    });
    return workouts;
  }

  async getWorkoutById(id: string, userId: string) {
    const workout = await prisma.workout.findFirst({
      where: { id, userId },
      include: {
        exercises: {
          orderBy: { order: 'asc' },
        },
      },
    });
    return workout;
  }
}

export const workoutsService = new WorkoutsService();
