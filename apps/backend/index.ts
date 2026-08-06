import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './src/config/swagger';

app.use(cors());
app.use(express.json());

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocs));

import authRoutes from './src/modules/auth/auth.routes';

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verifica o status da API
 *     description: Retorna um status ok para indicar que a API está funcionando.
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Hello World' });
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
