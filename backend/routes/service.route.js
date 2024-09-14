const express = require('express');
const { getService, getServices, createService, updateService, deleteService } = require('../controllers/service.controller');
const router = express.Router();

// Get a service by ID (Read a service)
router.get('/:id', getService);

// Get all services (Read all services)
router.get('/', getServices);

// Create a new service
router.post('/', createService);

// Update a service by ID
router.put('/:id', updateService);

// Delete a service by ID
router.delete('/:id', deleteService);

module.exports = router;