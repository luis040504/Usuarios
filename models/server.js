const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerUi, specs } = require('../swagger'); 
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
            console.log(`Documentación Swagger disponible en http://localhost:${this.port}/api-docs`);
        });
    }
}

module.exports = Server;
