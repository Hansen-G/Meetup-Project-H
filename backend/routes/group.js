const { Group } = require('../db/models');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const groups = await Group.findAll();
    return res.json(groups)
})

module.exports = router;


