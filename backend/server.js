require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const serviceRouter = require('./routes/service.route');
const serviceError = require('./middleware/serviceError.middleware'); // Import the custom error middleware

var cors = require('cors');

const app = express();

// Cors middleware
var corsOptions = {
    origin: 'FRONTEND_URI',
}
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the service router
app.use('/api/services', serviceRouter);

// Error handling middleware
app.use(serviceError);

app.listen(3000, () => {
    console.log('Node server running on 3000');
});

const mongoUri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', mongoUri);
const FRONTEND_URI = process.env.FRONTEND_URL;
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });