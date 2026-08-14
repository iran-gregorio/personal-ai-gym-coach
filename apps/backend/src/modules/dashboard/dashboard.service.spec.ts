import { dashboardService } from './dashboard.service';
import { prisma } from '../../prisma';

jest.mock('../../prisma', () => ({
  prisma: {
    workoutHistory: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      count: jest.fn(),
    },
    workout: {
      count: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    }
  }
}));

describe('DashboardService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty workoutOfDay if no history and no workouts exist', async () => {
    (prisma.workout.count as jest.Mock).mockResolvedValue(0);
    (prisma.workoutHistory.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.workout.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.workoutHistory.findMany as jest.Mock).mockResolvedValue([]);

    const result = await dashboardService.getDashboardData('user-1', '2023-10-25');

    expect(result.workoutOfDay).toBeNull();
    expect(result.weekProgress.length).toBe(7);
  });
  
  it('should return nextWorkout if history exists but not completed today', async () => {
    const mockClientDate = new Date('2023-10-25T10:00:00.000Z');
    
    (prisma.workout.count as jest.Mock).mockResolvedValue(1);

    // Last history was yesterday
    (prisma.workoutHistory.findFirst as jest.Mock).mockImplementation((args) => {
      if (args.where?.workoutId) {
        return Promise.resolve(null); // lastTimeThisWorkout
      }
      return Promise.resolve({
        workoutId: 'w-1',
        executedAt: new Date('2023-10-24T10:00:00.000Z'), // yesterday
        workout: { order: 1 }
      });
    });

    (prisma.workoutHistory.findMany as jest.Mock).mockResolvedValue([]);
    
    // Find next workout in sequence
    (prisma.workout.findFirst as jest.Mock).mockResolvedValue({
      id: 'w-2',
      description: 'Treino B',
      order: 2,
      tags: [],
      exercises: []
    });

    (prisma.workoutHistory.count as jest.Mock).mockResolvedValue(0);

    const result = await dashboardService.getDashboardData('user-1', '2023-10-25');

    expect(result.workoutOfDay).not.toBeNull();
    expect(result.workoutOfDay?.id).toBe('w-2');
    expect(result.workoutOfDay?.isCompletedToday).toBe(false);
  });

  it('should return the same workout marked as completed if history is from today', async () => {
    const mockClientDate = new Date('2023-10-25T10:00:00.000Z');
    
    (prisma.workout.count as jest.Mock).mockResolvedValue(1);

    // Last history was today
    (prisma.workoutHistory.findFirst as jest.Mock).mockImplementation((args) => {
      if (args.where?.workoutId) {
        return Promise.resolve({
          workoutId: 'w-1',
          executedAt: new Date('2023-10-25T08:00:00.000Z'), // today early
          durationSeconds: 3600
        }); // lastTimeThisWorkout
      }
      return Promise.resolve({
        workoutId: 'w-1',
        durationSeconds: 3600, // Fixed: adding this so isCompletedToday becomes true
        executedAt: new Date('2023-10-25T08:00:00.000Z'), // today early
        workout: { order: 1 }
      });
    });

    (prisma.workoutHistory.findMany as jest.Mock).mockResolvedValue([
      {
        workoutId: 'w-1',
        executedAt: new Date('2023-10-25T08:00:00.000Z'),
      }
    ]);
    
    // Find unique returns the same workout
    (prisma.workout.findUnique as jest.Mock).mockResolvedValue({
      id: 'w-1',
      description: 'Treino A',
      order: 1,
      tags: [],
      exercises: []
    });

    (prisma.workoutHistory.count as jest.Mock).mockResolvedValue(1);

    const result = await dashboardService.getDashboardData('user-1', '2023-10-25');

    expect(result.workoutOfDay).not.toBeNull();
    expect(result.workoutOfDay?.id).toBe('w-1');
    expect(result.workoutOfDay?.isCompletedToday).toBe(true);
    expect(result.workoutOfDay?.timesCompleted).toBe(1);
    expect(result.workoutOfDay?.lastDuration).toBe(3600);
  });
});
