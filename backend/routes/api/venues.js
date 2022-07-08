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

// Create a new Venue for a Group specified by its id
router.post('/new/groups/:groupId', checkAuth, async (req, res, next) => {
    const { groupId } = req.params;
    let { address, city, state, lat, lng } = req.body;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    } 

    let userId = req.user.id;
    const statuesOfCurrentUser = await GroupMember.findOne({
        where: {
            userId: userId,
            groupId: groupId,
        }
    })
    if (!statuesOfCurrentUser) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to add a venue",
            "statusCode": 400
        })
    }

    if (!(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === userId)) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to to add a venue",
            "statusCode": 400
        })
    }

    try {
        const newVenue = await Venue.create({
            address, groupId, city, state, lat, lng
        })
        const newVenueJson = newVenue.toJSON();
        delete newVenueJson.updatedAt;
        delete newVenueJson.createdAt;
        res.json(newVenueJson)
    } catch (err) {
        res.status(400).json(
            {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "address": "Street address is required",
                    "city": "City is required",
                    "state": "State is required",
                    "lat": "Latitude is not valid",
                    "lng": "Longitude is not valid",
                }
            }
        )  
    }
})



// Edit a Venue specified by its id
router.put('/:venueId', checkAuth, async (req, res, next) => {
    const { venueId } = req.params;
    let { address, city, state, lat, lng } = req.body;

    const venueToBeEdited = await Venue.findByPk(venueId)
    if (!venueToBeEdited) {
        res.status(404).json({
            "message": "Venue couldn't be found",
            "statusCode": 404
        })
    }
    const groupId = venueToBeEdited.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }
    let userId = req.user.id;
    const statuesOfCurrentUser = await GroupMember.findOne({
        where: {
            userId: userId,
            groupId: groupId,
        }
    });
    if (!statuesOfCurrentUser) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to edit a venue",
            "statusCode": 400
        })
    };

    if (!(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === userId)) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to to edit a venue",
            "statusCode": 400
        })
    };

    try {
        if (address) venueToBeEdited.address = address;
        if (city) venueToBeEdited.city = city;
        if (state) venueToBeEdited.state = state;
        if (lat) venueToBeEdited.lat = lat;
        if (lng) venueToBeEdited.lng = lng;
        await venueToBeEdited.save();
        const venueToBeEditedJson = venueToBeEdited.toJSON();
        delete venueToBeEditedJson.updatedAt
        res.json(venueToBeEditedJson)
    } catch (err){
        res.status(400).json(
            {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "address": "Street address is required",
                    "city": "City is required",
                    "state": "State is required",
                    "lat": "Latitude is not valid",
                    "lng": "Longitude is not valid",
                }
            }
        )  
    }

})


module.exports = router;