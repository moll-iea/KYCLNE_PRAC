const express = require('express');
const mongoose = require('mongoose');
const Service = require('./models/service.model');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
    // use in the api to parse the body of the request
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log('Node server running on 3000');
});

//Get a service by ID (Read a service)
app.get('/api/services/:id', async(req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if(!service) {
            return res.status(404).send('Service not found');
        }
        res.send(service);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

//Get all services (Read all services)
app.get('/api/services', async(req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});
// Connect to MongoDB (Save a new service)
app.post('/api/services', async(req, res) => {
   try {
        const service = await Service.create(req.body)
        res.status(201).send(service);
   } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
   }
});

// Update a service by ID
app.put('/api/services/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            // Cannot find any service with that ID
            return res.status(404).send(`Cannot find service with that ID ${req.params.id}`);
        }
        res.send(service);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Delete a service by ID
app.delete('/api/services/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send(`Cannot find service with that ID ${req.params.id}`);
        }
        res.send(service);
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