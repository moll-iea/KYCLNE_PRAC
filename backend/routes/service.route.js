const express = require('express');
const Service = require('../models/service.model');
const router = express.Router();

// Get a service by ID (Read a service)
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        res.send(service);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Get all services (Read all services)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Save a new service
router.post('/', async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).send(service);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send(`Cannot find service with that ID ${req.params.id}`);
        }
        res.send(service);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal server error');
    }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
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

module.exports = router;