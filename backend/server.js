const express = require('express');
const mongoose = require('mongoose');
const Service = require('./models/service.model');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

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

// Connect to MongoDB
app.post('/api/services', async(req, res) => {
   try {
        const service = await Service.create(req.body)
        res.status(201).send(service);
   } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
   }
});

const mongoUri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', mongoUri);

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });