import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal AI Gym Coach API',
      version: '1.0.0',
      description: 'Documentação da API do backend',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./index.ts', './src/modules/**/*.routes.ts'],
};

export const swaggerDocs = swaggerJsdoc(options);
