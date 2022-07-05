const { Group, GroupMember } = require('../../db/models');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/users/current', async (req, res, next) => {
    if (!req.user) {
        const err = new Error('No log In')
        next(err)
    }

    const userId = req.user.id;
    const groups = await GroupMember.findAll({
        include: [{model: Group}],
        where: {
            userId
        }
    })

    const result = {Groups:[]}
    groups.forEach(element => {
        result.Groups.push(element.Group)
        
    });
    res.json(result)
})


router.get('/', async (req, res, next) => {
    const groups = await Group.findAll();
    return res.json(groups)
})



module.exports = router;


