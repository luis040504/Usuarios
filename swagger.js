const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar usuarios',
    },
    servers: [
      {
        url: 'http://localhost:8085/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js', './models/Usuario.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
