const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'userdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length > 0) {
            const user = result[0];
            return res.status(200).json({
                message: 'Login successful',
                username: user.username,
                avatar: user.avatar
            });
        } else {
            return res.status(401).json({ message: 'Invalid Username or Password' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Register attempt:', { username, password });

    const checkUserNameExist = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserNameExist, [username], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (result.length > 0) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        const insertUser = 'INSERT INTO user (username, password) VALUES (?, ?)';
        db.query(insertUser, [username, password], (err) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send({ message: 'Internal server error' });
            }
            res.status(200).send({ message: 'User registered successfully' });
        });
    });
});

app.post('/delete', (req, res) => {
    const { username } = req.body;
    const deleteUser = 'DELETE FROM user WHERE username = ?';
    db.query(deleteUser, [username], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error' });
        }
        if (result.affectedRows > 0) {
            return res.status(200).send({ message: 'User deleted successfully' });
        } else {
            return res.status(400).send({ message: 'User not found' });
        }
    });
});

app.post('/update', (req, res) => {
    const { username, password } = req.body;
    const checkUserNameExist = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserNameExist, [username], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(400).send({ message: 'Username does not exist' });
        }

        const updateUser = 'UPDATE user SET password = ? WHERE username = ?';
        db.query(updateUser, [password, username], (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Internal server error' });
            }
            if (result.affectedRows > 0) {
                return res.status(200).send({ message: 'Password updated successfully' });
            } else {
                return res.status(400).send({ message: 'Password update failed' });
            }
        });
    });
});


app.post('/updateUser', (req, res) => {
    const { oldUsername, username, password } = req.body;

    const updateUser = 'UPDATE user SET username = ?, password = ? WHERE username = ?';
    db.query(updateUser, [username, password, oldUsername], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Internal server error' });
        }
        if (result.affectedRows > 0) {
            return res.status(200).send({ message: 'Updated successfully' });
        } else {
            return res.status(400).send({ message: 'Update failed' });
        }
    });

});

app.get('/getCategory', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error' });
        }
        res.status(200).send(result);
    });
})

app.get('/getLocation', (req, res) => {
    const query = 'SELECT * FROM location';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Internal server error' });
        }
        res.status(200).send(result);
    });
})

app

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})