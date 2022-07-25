const { 
    Group, 
    User, 
    GroupMember, 
    Event, 
    EventAttendee,
    Venue,
    Image,
 } = require('../db/models');
const express = require('express');
const router = express.Router();


router.get('/:groupId', async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.scope('defaultScope').findByPk(groupId, {
    })
    if (!group) {
        res.status(404).json({ 
            message: "Group couldn't be found", 
            statusCode: 404 
        })
    }
    const organizer = await User.scope(['generalInfoForGroups']).findByPk(group.organizerId);
   
    const images = await Image.findAll({
        attributes: ['url'],
        where: {
            groupId: groupId,
        }
    })
    const imageArr = [];
    images.forEach(element => {
        imageArr.push(element.dataValues.url)
    });
    const result = group.toJSON()

    result.Organizer = organizer.toJSON()
    result.image = imageArr
    res.json(result)
})
router.get('/', async (req, res, next) => {
    const groups = await Group.findAll();
    return res.json(groups)
})

module.exports = router;


