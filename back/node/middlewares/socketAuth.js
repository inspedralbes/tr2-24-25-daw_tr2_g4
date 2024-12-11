const jwt = require('jsonwebtoken'); // Necesitas jsonwebtoken

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth?.token; // Token desde el cliente
    if (!token) return next(new Error('Autenticación requerida'));

    try {
        const decoded = jwt.verify(token, 'CLAVE_SECRETA'); // Cambia 'CLAVE_SECRETA' por tu clave de JWT
        socket.user = decoded; // Adjuntar datos del usuario al socket
        next();
    } catch (err) {
        next(new Error('Token inválido'));
    }
};

module.exports = authenticateSocket;
