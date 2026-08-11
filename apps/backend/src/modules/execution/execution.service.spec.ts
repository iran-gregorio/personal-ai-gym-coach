import { executionService } from './execution.service';
import { prisma } from '../../prisma';

jest.mock('../../prisma', () => ({
  prisma: {
    workoutHistory: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    workout: {
      findUnique: jest.fn(),
    },
    workoutHistoryExercise: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    workoutExercise: {
      update: jest.fn(),
    }
  }
}));

describe('ExecutionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startWorkout', () => {
    it('should throw an error if workout not found', async () => {
      (prisma.workout.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(executionService.startWorkout('user-1', 'invalid-id')).rejects.toThrow('Workout not found');
    });

    it('should throw an error if unauthorized', async () => {
      (prisma.workout.findUnique as jest.Mock).mockResolvedValue({ userId: 'other-user' });

      await expect(executionService.startWorkout('user-1', 'w-1')).rejects.toThrow('Unauthorized');
    });

    it('should create and return workout history with 0 duration', async () => {
      const mockWorkout = {
        id: 'w-1',
        userId: 'user-1',
        description: 'Test Workout',
        exercises: [
          { id: 'ex-1', name: 'Squat', sets: '3', reps: '10', lastWeight: '100kg', order: 1 }
        ]
      };
      (prisma.workout.findUnique as jest.Mock).mockResolvedValue(mockWorkout);
      (prisma.workoutHistory.create as jest.Mock).mockResolvedValue({ id: 'history-1' });

      const result = await executionService.startWorkout('user-1', 'w-1');

      expect(prisma.workoutHistory.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          userId: 'user-1',
          workoutId: 'w-1',
          durationSeconds: 0,
          workoutDescriptionSnapshot: 'Test Workout',
        })
      }));
      expect(result).toEqual({ id: 'history-1' });
    });
  });

  describe('finishWorkout', () => {
    it('should update durationSeconds based on executedAt', async () => {
      const pastTime = new Date();
      pastTime.setSeconds(pastTime.getSeconds() - 3600); // 1 hour ago
      
      (prisma.workoutHistory.findUnique as jest.Mock).mockResolvedValue({
        id: 'history-1',
        userId: 'user-1',
        executedAt: pastTime
      });
      (prisma.workoutHistory.update as jest.Mock).mockResolvedValue({ id: 'history-1', durationSeconds: 3600 });
      (prisma.workoutHistoryExercise.findMany as jest.Mock).mockResolvedValue([]);

      const result = await executionService.finishWorkout('user-1', 'history-1');

      expect(prisma.workoutHistory.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 'history-1' },
        data: expect.objectContaining({
          durationSeconds: expect.any(Number) // should be ~3600
        })
      }));
    });
  });
});
