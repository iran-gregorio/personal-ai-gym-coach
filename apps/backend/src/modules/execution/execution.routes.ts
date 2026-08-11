import { Router } from 'express';
import { executionController } from './execution.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/execution/start:
 *   post:
 *     summary: Inicia a execução de um treino
 *     description: Cria um histórico de treino e copia os exercícios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workoutId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 *       400:
 *         description: workoutId é obrigatório
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/start', authMiddleware, executionController.startWorkout.bind(executionController));

/**
 * @swagger
 * /api/execution/{id}:
 *   get:
 *     summary: Obtém os dados de uma execução de treino em andamento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna a execução
 *       404:
 *         description: Execução não encontrada
 */
router.get('/:id', authMiddleware, executionController.getExecution.bind(executionController));

/**
 * @swagger
 * /api/execution/exercise/{id}:
 *   patch:
 *     summary: Atualiza o status e peso de um exercício na execução
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *               weightUsed:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exercício atualizado
 */
router.patch('/exercise/:id', authMiddleware, executionController.updateExercise.bind(executionController));

/**
 * @swagger
 * /api/execution/finish/{id}:
 *   patch:
 *     summary: Finaliza a execução do treino, calculando a duração
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Execução finalizada
 */
router.patch('/finish/:id', authMiddleware, executionController.finishWorkout.bind(executionController));

export default router;
