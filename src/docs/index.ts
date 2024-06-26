import swaggerJsDoc from 'swagger-jsdoc';

import { baseUrl } from '../config/envVar';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: baseUrl,
        description: 'Development',
      },
    ],
  },
  apis: ['./src/docs/**/*.ts', './src/docs/*.ts'],
  swaggerOptions: {
    docExpansion: 'none', // Collapse all operations by default
  },
};

export const specs = swaggerJsDoc(options);
