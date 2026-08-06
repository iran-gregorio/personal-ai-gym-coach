import request from 'supertest';
import express from 'express';
import { authService } from './auth.service';
import authRoutes from './auth.routes';

// Configura um app express de teste
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

jest.mock('./auth.service');

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and auth data on successful login', async () => {
    const mockAuthData = {
      token: 'mock-token',
      user: { id: 1, email: 'test@example.com' },
    };

    (authService.login as jest.Mock).mockResolvedValue(mockAuthData);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAuthData);
  });

  it('should return 400 for validation error (missing password)', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Dados de login inválidos');
  });

  it('should return 401 for invalid credentials', async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error('Credenciais inválidas'));

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciais inválidas');
  });

  it('should return 500 for other errors', async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error('Some other error'));

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Erro interno no servidor');
  });
});
