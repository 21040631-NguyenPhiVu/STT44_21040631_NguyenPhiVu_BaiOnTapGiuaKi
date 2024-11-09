const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb://localhost:27017/userdb";
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
});

const locationSchema = new mongoose.Schema({
    image: String
});

const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema, 'Category');
const Location = mongoose.model('Location', locationSchema, 'Location');

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            return res.status(200).json({
                message: 'Login successful',
                username: user.username,
            });
        } else {
            return res.status(401).json({ message: 'Invalid Username or Password' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Register attempt:', { username, password });

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(200).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/delete', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await User.deleteOne({ username });
        if (result.deletedCount > 0) {
            return res.status(200).send({ message: 'User deleted successfully' });
        } else {
            return res.status(400).send({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/update', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'Username does not exist' });
        }

        user.password = password;
        await user.save();
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/updateUser', async (req, res) => {
    const { oldUsername, username, password } = req.body;

    try {
        const result = await User.updateOne({ username: oldUsername }, { username, password });
        if (result.matchedCount > 0) {
            return res.status(200).send({ message: 'Updated successfully' });
        } else {
            return res.status(400).send({ message: 'Update failed' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.get('/getCategory', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.get('/getLocation', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).send(locations);
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});