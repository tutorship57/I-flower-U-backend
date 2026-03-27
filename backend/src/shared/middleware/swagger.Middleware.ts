import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/*.ts','./src/**/*.js','./src/modules/**/routes/*.ts'], // เจาะจงโฟลเดอร์ route ของคุณ], // Path to the API docs (your route files)
};

export const swaggerDocumentConfig = swaggerJsdoc(options);

