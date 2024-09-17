const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// Add a new service
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Service name and price are required' });
    }

    const service = new Service({ name, description, price });

    try {
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.remove();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
