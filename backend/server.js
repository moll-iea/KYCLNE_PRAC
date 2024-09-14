const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Declare routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog my name is ganda');
});

app.listen(3000, () => {
    console.log('Node server running on 3000');
});

const mongoUri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', mongoUri);

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });