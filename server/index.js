const express = require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));