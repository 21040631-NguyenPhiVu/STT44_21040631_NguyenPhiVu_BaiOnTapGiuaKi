const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'userdb'
});

db.connect(err => {
    if (err) {
        console.error('Could not connect to MySQL', err);
    } else {
        console.log('Connected!');
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(200).json({
                message: 'Login successful',
                username: results[0].username,
            });
        } else {
            return res.status(401).json({ message: 'Invalid Username or Password' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Register attempt:', { username, password });

    const query = 'SELECT * FROM user WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        const insertQuery = 'INSERT INTO user (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, password], (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Internal server error' });
            }
            res.status(200).send({ message: 'User registered successfully' });
        });
    });
});

app.post('/delete', (req, res) => {
    const { username } = req.body;

    const query = 'DELETE FROM user WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (results.affectedRows > 0) {
            return res.status(200).send({ message: 'User deleted successfully' });
        } else {
            return res.status(400).send({ message: 'User not found' });
        }
    });
});

app.post('/update', (req, res) => {
    const { username, password } = req.body;

    const query = 'UPDATE user SET password = ? WHERE username = ?';
    db.query(query, [password, username], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (results.affectedRows > 0) {
            return res.status(200).send({ message: 'Password updated successfully' });
        } else {
            return res.status(400).send({ message: 'Username does not exist' });
        }
    });
});

app.post('/updateUser', (req, res) => {
    const { oldUsername, username, password } = req.body;

    const query = 'UPDATE user SET username = ?, password = ? WHERE username = ?';
    db.query(query, [username, password, oldUsername], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (results.affectedRows > 0) {
            return res.status(200).send({ message: 'Updated successfully' });
        } else {
            return res.status(400).send({ message: 'Update failed' });
        }
    });
});

app.get('/getCategory', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        res.status(200).send(results);
    });
});

app.get('/getLocation', (req, res) => {
    const query = 'SELECT * FROM location';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        res.status(200).send(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});