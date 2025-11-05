const authService = require('../models/authService');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const payload = authService.verifyToken(token);
        req.usuario = payload; 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = validarJWT;
