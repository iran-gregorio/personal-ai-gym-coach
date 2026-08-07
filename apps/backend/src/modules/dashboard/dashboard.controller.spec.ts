import request from 'supertest';
import express from 'express';
import { dashboardController } from './dashboard.controller';
import { dashboardService } from './dashboard.service';

const app = express();
app.use(express.json());

// Mock simple auth middleware behavior just for this route test
app.use((req, res, next) => {
  (req as any).userId = 'test-user-id';
  next();
});

app.get('/api/dashboard', (req, res) => dashboardController.getDashboardData(req, res));

// Mock the dashboard service
jest.mock('./dashboard.service', () => ({
  dashboardService: {
    getDashboardData: jest.fn(),
  },
}));

describe('DashboardController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if clientDate is missing', async () => {
    const response = await request(app)
      .get('/api/dashboard'); // No query params

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('clientDate is required');
  });

  it('should return 200 and dashboard data if clientDate is provided', async () => {
    const mockData = {
      weekProgress: [],
      workoutOfDay: null
    };

    (dashboardService.getDashboardData as jest.Mock).mockResolvedValue(mockData);

    const response = await request(app)
      .get('/api/dashboard?clientDate=2023-10-25T10:00:00.000Z');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
    
    // Check if the service was called with the correct parameters
    expect(dashboardService.getDashboardData).toHaveBeenCalledWith(
      'test-user-id', 
      '2023-10-25T10:00:00.000Z'
    );
  });

  it('should return 500 if dashboardService throws an error', async () => {
    (dashboardService.getDashboardData as jest.Mock).mockRejectedValue(new Error('Internal error'));

    // spy on console.error to avoid printing to the test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await request(app)
      .get('/api/dashboard?clientDate=2023-10-25T10:00:00.000Z');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Erro interno no servidor');
    
    consoleSpy.mockRestore();
  });
});
