const express = require('express');
const Student = require('../models/student');
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const students = await Student.find();
        res.json(students);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.post("/", async function(req, res) {
    console.log(req.body);
    
    const dob = new Date(req.body.dob);
    const today = new Date(Date.now());
    const youngestDob = new Date(new Date().setFullYear(today.getFullYear() - 10));

    if ((!req.body.firstName || req.body.firstName.length < 0) || (!req.body.familyName || req.body.familyName < 0) || !(dob instanceof Date && isFinite(dob) && dob < youngestDob)) {
        console.log("invalid data");
        res.status(400).json({message: 'invalid data'});
        return;
    }
    const student = new Student({
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        dob: req.body.dob
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router;