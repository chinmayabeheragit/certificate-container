const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new project
router.post('/', async (req, res) => {
    const { name, link, description, image } = req.body;
    const newProject = new Project({ name, link, description, image });

    try {
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
