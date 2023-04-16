const express = require('express');
const Result = require('../models/result');
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const results = await Result.find();
        res.json(results);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.post("/", async function(req, res) {
    console.log(req.body);

    if ((!req.body.course || req.body.course.length < 0) || (!req.body.student || req.body.student.length < 0) || (!req.body.score || req.body.score.length < 0)) {
        res.status(400).json({message: 'invalid data'});
        return;
    }

    const result = new Result({
        course: req.body.course,
        student: req.body.student,
        score: req.body.score
    });

    try {
        const newResult = await result.save();
        res.status(201).json(newResult);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});


module.exports = router;