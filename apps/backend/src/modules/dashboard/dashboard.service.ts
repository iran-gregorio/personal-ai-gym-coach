import { prisma } from '../../prisma';
import { startOfWeek, endOfWeek, eachDayOfInterval, addMinutes } from 'date-fns';

export class DashboardService {
  async getDashboardData(userId: string, clientDateStr: string) {
    // clientDateStr is 'YYYY-MM-DD'. Parse as UTC midnight to do pure UTC math
    const clientDate = new Date(`${clientDateStr}T00:00:00Z`);
    
    // Calculate week interval
    const weekStart = startOfWeek(clientDate, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(clientDate, { weekStartsOn: 1 }); // Sunday
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    // Fetch histories for the week, plus some buffer for timezone shifts
    const weekHistories = await prisma.workoutHistory.findMany({
      where: {
        userId,
        executedAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    const weekProgress = days.map((day: Date) => {
      const dayStr = day.toISOString().substring(0, 10);
      const historyForDay = weekHistories.find(h => {
        return h.executedAt.toISOString().substring(0, 10) === dayStr;
      });
      return {
        date: day.toISOString(),
        isCompleted: !!historyForDay,
      };
    });

    // Find the last workout history ever
    const lastHistory = await prisma.workoutHistory.findFirst({
      where: { userId },
      orderBy: { executedAt: 'desc' },
      include: { workout: true },
    });

    let nextWorkout = null;
    let isCompletedToday = false;
    let timesCompleted = 0;

    if (!lastHistory) {
      // Find the first workout (lowest order)
      nextWorkout = await prisma.workout.findFirst({
        where: { userId },
        orderBy: { order: 'asc' },
        include: { exercises: true },
      });
    } else {
      const lastHistoryDateStr = lastHistory.executedAt.toISOString().substring(0, 10);
      const clientDateOnlyStr = clientDateStr;

      if (lastHistoryDateStr === clientDateOnlyStr) {
        if (lastHistory.durationSeconds > 0) {
          isCompletedToday = true;
        }
        // The workout of the day is the one they just did or are currently doing
        if (lastHistory.workoutId) {
          nextWorkout = await prisma.workout.findUnique({
            where: { id: lastHistory.workoutId },
            include: { exercises: true },
          });
        }
      } else {
        // Find next workout in sequence
        if (lastHistory.workout) {
          nextWorkout = await prisma.workout.findFirst({
            where: {
              userId,
              order: { gt: lastHistory.workout.order },
            },
            orderBy: { order: 'asc' },
            include: { exercises: true },
          });
        }

        if (!nextWorkout) {
          // Loop back to start
          nextWorkout = await prisma.workout.findFirst({
            where: { userId },
            orderBy: { order: 'asc' },
            include: { exercises: true },
          });
        }
      }
    }

    let lastDate: string | null = null;
    let lastDuration: number | null = null;

    if (nextWorkout) {
      // How many times this workout was done
      timesCompleted = await prisma.workoutHistory.count({
        where: { userId, workoutId: nextWorkout.id },
      });

      // The very last time this specific workout was done
      const lastTimeThisWorkout = await prisma.workoutHistory.findFirst({
        where: { userId, workoutId: nextWorkout.id },
        orderBy: { executedAt: 'desc' },
      });

      if (lastTimeThisWorkout) {
        lastDate = lastTimeThisWorkout.executedAt.toISOString();
        lastDuration = lastTimeThisWorkout.durationSeconds;
      }
    }

    return {
      weekProgress,
      workoutOfDay: nextWorkout ? {
        ...nextWorkout,
        isCompletedToday,
        timesCompleted,
        lastDate,
        lastDuration,
      } : null,
    };
  }
}

export const dashboardService = new DashboardService();
