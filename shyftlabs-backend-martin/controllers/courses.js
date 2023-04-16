const express = require('express');
const Course = require('../models/course');
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const courses = await Course.find();
        res.json(courses);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.post("/", async function(req, res) {
    console.log(req.body);

    if (!req.body.name || req.body.name.length < 0) {
        res.status(400).json({message: 'invalid data'});
        return;
    }

    const course = new Course({
        name: req.body.name
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;