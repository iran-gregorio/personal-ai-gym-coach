import { Request, Response } from 'express';
import { dashboardService } from './dashboard.service';

export class DashboardController {
  async getDashboardData(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const clientDateStr = req.query.clientDate as string;

      if (!clientDateStr) {
        return res.status(400).json({ error: 'clientDate is required' });
      }

      const dashboardData = await dashboardService.getDashboardData(userId, clientDateStr);
      
      res.status(200).json(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

export const dashboardController = new DashboardController();
