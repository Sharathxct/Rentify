const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, phoneNumber, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const checkToken = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.json({ user})
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = { registerUser, loginUser, checkToken };
