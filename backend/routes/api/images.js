const {
    Group,
    User,
    GroupMember,
    Event,
    EventAttendee,
    Venue,
    Image,
} = require('../../db/models');

const express = require('express');
const router = express.Router();
const { Op, json } = require('sequelize');

const checkAuth = async (req, res, next) => {
    if (!req.user) {
        const err = new Error('No log In')
        next(err);
    } else {
        next();
    }
}

router.delete('/:imageId', checkAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const userId = req.user.id;
    const imageToBeDeleted = await Image.findByPk(imageId);
    if(!imageToBeDeleted){
        return res.status(404).json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    }

    if (imageToBeDeleted.userId !== userId){
        return res.status(403).json({
            "message": "Image must belong to the current user",
            "statusCode": 403
        })
    }

    await imageToBeDeleted.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})






module.exports = router;