import { Request, Response } from 'express';
import { workoutsService } from './workouts.service';

export class WorkoutsController {
  async getAllWorkouts(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Não autorizado' });
      }

      const workouts = await workoutsService.getAllWorkouts(userId);
      return res.status(200).json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar treinos' });
    }
  }

  /**
   * @openapi
   * /api/workouts/{id}:
   *   get:
   *     summary: Retorna os detalhes de um treino específico
   *     tags: [Workouts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do treino
   *     responses:
   *       200:
   *         description: Treino retornado com sucesso, incluindo lista de exercícios
   *       401:
   *         description: Não autorizado
   *       404:
   *         description: Treino não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async getWorkoutById(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ error: 'Não autorizado' });
      }

      const id = req.params.id as string;
      const workout = await workoutsService.getWorkoutById(id, userId);

      if (!workout) {
        return res.status(404).json({ error: 'Treino não encontrado' });
      }

      return res.status(200).json(workout);
    } catch (error) {
      console.error('Error fetching workout by id:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar o treino' });
    }
  }
}

export const workoutsController = new WorkoutsController();
