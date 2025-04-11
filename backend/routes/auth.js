const express = require('express');
const fs = require('fs');
const router = express.Router();
const USERS_DB = './users.json';

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    let users = [];

    if (fs.existsSync(USERS_DB)) {
        users = JSON.parse(fs.readFileSync(USERS_DB));
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists!' });
    }

    users.push({ username, password });
    fs.writeFileSync(USERS_DB, JSON.stringify(users));
    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_DB));

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
});

module.exports = router;
