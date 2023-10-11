const express = require('express');
const GenderService = require('../services/gender.service');

const router = express.Router();
const service = new GenderService();

router.get('/', async (req, res) => {
    const genders = await service.find();
    res.json(genders);
});

module.exports = router;