import { Request, Response } from 'express';
import { executionService } from './execution.service';

export class ExecutionController {
  async startWorkout(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { workoutId, executedAt } = req.body;

      if (!workoutId) {
        return res.status(400).json({ error: 'workoutId is required' });
      }

      const history = await executionService.startWorkout(userId, workoutId, executedAt);
      res.status(201).json(history);
    } catch (error: any) {
      console.error('Error starting workout:', error);
      res.status(500).json({ error: error.message || 'Erro interno no servidor' });
    }
  }

  async getExecution(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;

      const history = await executionService.getExecution(userId, id as string);
      res.status(200).json(history);
    } catch (error: any) {
      console.error('Error getting execution:', error);
      res.status(404).json({ error: error.message || 'Erro interno no servidor' });
    }
  }

  async updateExercise(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;
      const { isCompleted, weightUsed } = req.body;

      const updated = await executionService.updateExercise(userId, id as string, isCompleted, weightUsed);
      res.status(200).json(updated);
    } catch (error: any) {
      console.error('Error updating exercise:', error);
      res.status(500).json({ error: error.message || 'Erro interno no servidor' });
    }
  }

  async finishWorkout(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { id } = req.params;
      const { finishedAt } = req.body;

      const updated = await executionService.finishWorkout(userId, id as string, finishedAt);
      res.status(200).json(updated);
    } catch (error: any) {
      console.error('Error finishing workout:', error);
      res.status(500).json({ error: error.message || 'Erro interno no servidor' });
    }
  }
}

export const executionController = new ExecutionController();
