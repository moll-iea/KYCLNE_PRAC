const Service = require('../models/service.model');
const asyncHandler = require('express-async-handler');

// Get a service by ID (Read a service)
const getService = asyncHandler (async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        res.send(service);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
})

// Get all services (Read all services)
const getServices = asyncHandler (async (req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
})

// Create a new service
const createService = asyncHandler(async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).send(service);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
})

// Update a service by ID
const updateService = asyncHandler(async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send(`Cannot find service with that ID ${req.params.id}`);
        }
        res.send(service);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
})

// Delete a service by ID
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
        res.status(404);
        throw new Error(`Cannot find service with that ID ${req.params.id}`);
    }
    res.send(service);
});


module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
};