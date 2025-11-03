const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: false // Deshabilita createdAt y updatedAt
});

module.exports = Usuario;
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - pass
 *       properties:
 *         nombre:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan.perez@correo.com
 *         pass:
 *           type: string
 *           example: 123456
 */

