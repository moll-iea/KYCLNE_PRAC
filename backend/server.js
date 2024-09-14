require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const serviceRouter = require('./routes/service.route');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the service router
app.use('/api/services', serviceRouter);

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