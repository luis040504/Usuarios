const { Router } = require('express');
const authService = require('../models/authService');
const Usuario = require('../models/usuario');

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica al usuario y genera un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', async (req, res) => {
    const { email, pass } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.pass !== pass) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = authService.generateToken({ id: usuario.id, email: usuario.email });
    res.json({ token });
});

module.exports = router;
