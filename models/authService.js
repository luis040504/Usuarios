const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

class AuthService {
    constructor() {
        this.privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'private.key'), 'utf8');
        this.publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'public.key'), 'utf8');
    }

    generateToken(payload, options = {}) {
        return jwt.sign(payload, this.privateKey, {
            algorithm: 'RS256',
            expiresIn: options.expiresIn || '1h',
            issuer: 'api-usuarios',
            audience: 'usuarios-app'
        });
    }

    verifyToken(token) {
        return jwt.verify(token, this.publicKey, {
            algorithms: ['RS256'],
            issuer: 'api-usuarios',
            audience: 'usuarios-app'
        });
    }
}

module.exports = new AuthService();
