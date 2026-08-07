import { Router } from 'express';
import { dashboardController } from './dashboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Obtém os dados do dashboard
 *     description: Retorna o progresso semanal e o treino do dia para o usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientDate
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: A data atual no fuso horário do cliente (ex. 2023-10-25T10:00:00.000Z)
 *     responses:
 *       200:
 *         description: Dados do dashboard retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weekProgress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       isCompleted:
 *                         type: boolean
 *                 workoutOfDay:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                     description:
 *                       type: string
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isCompletedToday:
 *                       type: boolean
 *                     timesCompleted:
 *                       type: integer
 *                     lastDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                     lastDuration:
 *                       type: integer
 *                       nullable: true
 *                     exercises:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Parâmetros inválidos (ex. clientDate ausente)
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', authMiddleware, dashboardController.getDashboardData.bind(dashboardController));

export default router;
