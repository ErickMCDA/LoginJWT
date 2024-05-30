const jwt = require('jsonwebtoken');
const SECRET_KEY = 'erick2004';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = authenticateToken;