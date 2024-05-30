const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const authenticateToken = require('./authMiddleware'); // Importar el middleware de autenticación

const app = express();
const PORT = 3000;
const SECRET_KEY = 'erick2004';

app.use(bodyParser.json());
app.use(cors());

// Endpoint para autenticarse y obtener un token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('users.json'));

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user });
    } else {
        res.status(401).send('Username or password is incorrect');
    }
});

// Rutas protegidas

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Another protected data', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});