import { Request, Response } from 'express';
import { authService } from './auth.service';
import { loginSchema } from './auth.schema';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const parsedData = loginSchema.safeParse(req.body);

      if (!parsedData.success) {
        res.status(400).json({ error: 'Dados de login inválidos', details: parsedData.error.issues });
        return;
      }

      const result = await authService.login(parsedData.data);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Credenciais inválidas') {
        res.status(401).json({ error: error.message });
      } else {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
      }
    }
  }
}

export const authController = new AuthController();
