const request = require('supertest');
const express = require('express');
const usuarioRoutes = require('../routes/usuarios');
const Usuario = require('../models/usuario');


jest.mock('../models/usuario');

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

describe('API de Usuarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/usuarios debe retornar lista de usuarios', async () => {
    Usuario.findAll.mockResolvedValue([
      { id: 1, nombre: 'Juan', email: 'juan@correo.com', pass: '123' },
    ]);

    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nombre).toBe('Juan');
  });

  test('POST /api/usuarios debe crear un usuario', async () => {
    const nuevoUsuario = { nombre: 'Ana', email: 'ana@correo.com', pass: '456' };
    Usuario.create.mockResolvedValue(nuevoUsuario);

    const res = await request(app).post('/api/usuarios').send(nuevoUsuario);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('ana@correo.com');
  });

  test('PUT /api/usuarios/:id debe actualizar un usuario', async () => {
    Usuario.update.mockResolvedValue([1]);

    const res = await request(app)
      .put('/api/usuarios/1')
      .send({ nombre: 'Ana Actualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario actualizado correctamente');
  });

  test('DELETE /api/usuarios/:id debe eliminar un usuario', async () => {
    Usuario.destroy.mockResolvedValue(1);

    const res = await request(app).delete('/api/usuarios/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuario eliminado correctamente');
  });
});
