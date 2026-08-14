import { Router } from 'express';
import { workoutsController } from './workouts.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Retorna a lista de todos os treinos do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/', authMiddleware, workoutsController.getAllWorkouts.bind(workoutsController));
router.get('/:id', authMiddleware, workoutsController.getWorkoutById.bind(workoutsController));

export default router;
