import { workoutsService } from './workouts.service';
import { prisma } from '../../prisma';

jest.mock('../../prisma', () => ({
  prisma: {
    workout: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('WorkoutsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a workout by id and userId', async () => {
    const mockWorkout = { id: '1', userId: 'user-1', name: 'Treino A', exercises: [] };
    (prisma.workout.findFirst as jest.Mock).mockResolvedValue(mockWorkout);

    const result = await workoutsService.getWorkoutById('1', 'user-1');
    expect(prisma.workout.findFirst).toHaveBeenCalledWith({
      where: { id: '1', userId: 'user-1' },
      include: { exercises: true },
    });
    expect(result).toEqual(mockWorkout);
  });
});
