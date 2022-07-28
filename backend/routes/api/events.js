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

// Add an Image to a Event based on the Event's id
router.post('/:eventId/new/image', checkAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { url } = req.body;

    const event = await Event.findByPk(eventId);
    if (!event) {
        res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }
    let userId = req.user.id;

    const statusOfCurrentUser = await EventAttendee.findOne({
        where: {
            userId: userId,
            eventId: eventId,
        }
    })
    if (!statusOfCurrentUser){
        return res.status(403).json({
            "message": "Current User must be an attendee of the event",
            "statusCode": 403
        })
    }

    if (statusOfCurrentUser.attendeeStatus !== 'member') {
        return res.status(403).json({
            "message": "Current User must be an attendee of the event",
            "statusCode": 403
        })
    }

    const imageableType = 'event'
    const newImage = await Image.create({
        imageableType: imageableType,
        eventId: eventId,
        userId: userId,
        url: url
    })
    let newImageJson = newImage.toJSON();
    delete newImageJson.userId;
    delete newImageJson.groupId;
    delete newImageJson.updatedAt;
    delete newImageJson.createdAt;

    res.json(newImageJson)
})



// Delete attendance to an event specified by id
router.delete('/:eventId/attendees/:userId', checkAuth, async (req, res, next) => {
    let { eventId, userId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }

    const currentUserId = req.user.id;
    let groupId = event.groupId;
    groupId = parseInt(groupId);
    const group = await Group.findByPk(groupId);

    const statuesOfCurrentUser = await GroupMember.findOne({
        where: {
            userId: currentUserId,
            groupId: groupId,
        }
    })
    if (!statuesOfCurrentUser) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to delete an attendee",
            "statusCode": 400
        })
    }
    if (!(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === currentUserId || currentUserId == userId) ) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to delete an attendee",
            "statusCode": 400
        })
    }
    const attendeeToBeDeleted = await EventAttendee.findOne({
        where: {
            eventId: eventId,
            userId: userId,
        }
    });
    if (!attendeeToBeDeleted) {
        res.status(404).json(
            {
                "message": "Attendance between the user and the event does not exist",
                "statusCode": 404
            }
        )
    }

    await attendeeToBeDeleted.destroy();
    return res.json({
        "message": "Successfully deleted attendance from event"
    })



})

// Change the status of an attendance for an event specified by id
router.put('/:eventId/attendees', checkAuth, async (req, res, next) => {
    let { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }

    let { userId, status } = req.body
    if (status === 'pending'){
        return res.status(400).json({
            "message": "Cannot change an attendance status to pending",
            "statusCode": 400
        });
    }
    const currentUserId = req.user.id;
    let groupId = event.groupId;
    groupId = parseInt(groupId);
    const group = await Group.findByPk(groupId);

    const statuesOfCurrentUser = await GroupMember.findOne({
        where: {
            userId: currentUserId,
            groupId: groupId,
        }
    })
    
    if (!statuesOfCurrentUser) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to change an attendee",
            "statusCode": 400
        })
    }
    
    if (!(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === currentUserId)) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to change an attendee",
            "statusCode": 400
        })
    }

    const attendeeToBeChanged = await EventAttendee.findOne({
        where: {
            eventId: eventId,
            userId: userId,
        }
    });
    if (!attendeeToBeChanged) {
        res.status(404).json(
            {
                "message": "Attendance between the user and the event does not exist",
                "statusCode": 404
            }
        )
    }
    attendeeToBeChanged.attendeeStatus = status;
    await attendeeToBeChanged.save();
    return res.json({
        id: attendeeToBeChanged.id,
        eventId: eventId,
        userId: userId,
        status: status,
    })
})

// Request to Attend an Event based on the Event's id
router.post('/:eventId/join', checkAuth, async (req, res, next) => {
    let { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
        res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }
    const userId = req.user.id;
    let groupId = event.groupId;
    groupId = parseInt(groupId)
    
    const allUserId = await EventAttendee.findAll({
        where: {
            eventId: eventId
        },
        attributes: ['userId', 'attendeeStatus']
    })

    let attendeeArr = [];
    allUserId.forEach(element => {
        attendeeArr.push([element.dataValues.userId, element.dataValues.attendeeStatus])
    })

    
    for (let i = 0; i < attendeeArr.length; i++) {
        if (userId === attendeeArr[i][0]) {
            if (attendeeArr[i][1] === 'pending') {
                res.status(400).json({
                    "message": "Attendance has already been requested",
                    "statusCode": 400
                })
            }
            if (attendeeArr[i][1] === 'member' || attendeeArr[i][1] === 'waiting list') {
                res.status(400).json({
                    "message": "User is already an attendee of the event",
                    "statusCode": 400
                })
            }
        }
    }

    const attendeeStatus = 'pending';
    const newAttendee = await EventAttendee.create(
        {
            userId,
            eventId,
            attendeeStatus
        }
    )
    res.json({
        eventId: eventId,
        userId: userId,
        attendeeStatus: 'pending'
    })
})


// Get all Attendees of an Event specified by its id
router.get('/:eventId/attendees', async (req, res, next) => {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
        res.status(404).json(
            {
                "message": "Event couldn't be found",
                "statusCode": 404
            }
        )
    }
    if (req.user){
        const userId = req.user.id;
        let groupId = event.groupId;
        const group = await Group.findByPk(groupId);
        if (!group) {
            res.status(404).json({
                "message": "Group couldn't be found",
                "statusCode": 404
            })
        }
        const statuesOfCurrentUser = await GroupMember.findOne({
            where: {
                userId: userId,
                groupId: groupId,
            }
        })
        if (!statuesOfCurrentUser) {
            return res.status(403).json({
                "message": "Current User must be the organizer or a co-host to view the member for a private group",
                "statusCode": 403
            })
        }

        if ((statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === userId)) {
            const allEventAttendee = await User.findAll({
                include: [
                    {
                        model: EventAttendee,
                        where: {
                            eventId: eventId
                        },
                        attributes: ['attendeeStatus']
                    },

                ],
                attributes: ['id', 'firstName', 'lastName']
            })
            return res.json(allEventAttendee)
        }
    }

    let groupId = event.groupId;
   
    const allEventAttendee = await User.findAll({
        include: [{
                model: EventAttendee,
                where: {
                    eventId: eventId,
                    attendeeStatus: {
                        [Op.notIn]: ['pending']
                    }
                },
                attributes: ['attendeeStatus']
            },
        ],
        attributes: ['id', 'firstName', 'lastName']
    })

    return res.json(allEventAttendee)
})



// Delete an Event specified by its id
router.delete('/:eventId', checkAuth, async (req, res, next) => {
    let { eventId } = req.params
    const eventToBeDeleted = await Event.findByPk(eventId)
    if (!eventToBeDeleted) {
        res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }

    const groupId = eventToBeDeleted.groupId;
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
        await eventToBeDeleted.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } catch (err) {
        res.status(400).json({
            "message": "Delete error",
            "statusCode": 400,
        })
    }
})


// Edit an Event specified by its id
router.put('/:eventId', checkAuth, async (req, res, next) => {
    let { eventId } = req.params 
    let { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const eventToBeEdited = await Event.findByPk(eventId)
    if (!eventToBeEdited){
        res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }
    const groupId = eventToBeEdited.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }
    const newVenue = await Venue.findByPk(venueId);
    if (!newVenue){
        res.status(404).json({
            "message": "Venue couldn't be found",
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
        if (venueId) eventToBeEdited.venueId = venueId;
        if (name) eventToBeEdited.name = name;
        if (type) eventToBeEdited.type = type;
        if (capacity) eventToBeEdited.capacity = capacity;
        if (price) eventToBeEdited.price = price;
        if (description) eventToBeEdited.description = description;
        if (startDate) eventToBeEdited.startDate = startDate;
        if (endDate) eventToBeEdited.endDate = endDate; 
        await eventToBeEdited.save();
        let eventToBeEditedJson = eventToBeEdited.toJSON();
        delete eventToBeEditedJson.updatedAt;
        delete eventToBeEditedJson.createdAt;
        res.json(eventToBeEditedJson)
    } catch (err) {
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "venueId": "Venue does not exist",
                "name": "Name must be at least 5 characters",
                "type": "Type must be Online or In person",
                "capacity": "Capacity must be an integer",
                "price": "Price is invalid",
                "description": "Description is required",
                "startDate": "Start date must be in the future",
                "endDate": "End date is less than start date",
            }
        })
    }
})


// Create an Event for a Group specified by its id
router.post('/new/groups/:groupId', checkAuth, async (req, res, next) => {
    let { groupId } = req.params;
    let { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    groupId = parseInt(groupId);
    venueId = parseInt(venueId);
    capacity = parseInt(capacity)
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
       
        const newEvent = await Event.create({
            groupId, venueId, name, type, capacity, price, description, startDate, endDate
        });
        const newEventJson = newEvent.toJSON();
        delete newEventJson.updatedAt;
        delete newEventJson.createdAt;
     
        res.json(newEventJson)

    } catch (err){
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "venueId": "Venue does not exist",
                "name": "Name must be at least 5 characters",
                "type": "Type must be Online or In person",
                "capacity": "Capacity must be an integer",
                "price": "Price is invalid",
                "description": "Description is required",
                "startDate": "Start date must be in the future",
                "endDate": "End date is less than start date",
            }
        })
    }

})


//Get details of an Event specified by its id
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;
    const targetEvent = await Event.findByPk(eventId, {
        include: [{
            model: Group,
            attributes: [
                'id', 'name', 'private', 'city', 'state', 'previewImage'
            ]
        }, {
            model: Venue,
            attributes: [
                'id', 'address', 'city', 'state', 'lat', 'lng'
            ]
        }]
    });
    if (!targetEvent) {
        res.status(404).json({
            "message": "Event couldn't be found",
            "statusCode": 404
        })
    }
    return res.json(targetEvent)
    
})



// Get all Events of a Group specified by its id
router.get('/groups/:groupId', async (req, res, next) => {
    const { groupId } = req.params;
    const targetGroup = await Group.findByPk(groupId);
    if (!targetGroup){ 
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }
    const eventsOfGroup = await Event.findAll({
        include: [{
            model: Group,
            attributes: [
                'id', 'name', 'city', 'state'
            ]
        }, {
            model: Venue,
            attributes: [
                'id', 'city', 'state'
            ]
        }],
        where:{
            groupId: groupId
        }
    })
    if (!eventsOfGroup.length){
        res.status(404).json({
            "message": "Events couldn't be found",
            "statusCode": 404
        })
    }
    return res.json(eventsOfGroup)
})

// Get all Events
router.get('/', async (req, res, next) => {
    let pagination = {};
    let { page, size, name, type, startDate } = req.query;
    page = page === undefined ? 0 : parseInt(page)
    size = size === undefined ? 20 : parseInt(size)

    if (Number.isInteger(page) && Number.isInteger(size) && size >= 0 && page > 0 && size <= 20 && page <= 10) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    } else if (page === 0) {
        pagination = {};
    } else {
        return res.status(400).json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "page": "Page must be greater than or equal to 0",
                    "size": "Size must be greater than or equal to 0",
                    "name": "Name must be a string",
                    "type": "Type must be 'Online' or 'In Person'",
                    "startDate": "Start date must be a valid datetime",
                }
            }
        )
    }
    if (type){
        if (!(type === 'Online' || type === 'In Person')) {
            return res.status(400).json(
                {
                    "message": "Validation Error",
                    "statusCode": 400,
                    "errors": {
                        "page": "Page must be greater than or equal to 0",
                        "size": "Size must be greater than or equal to 0",
                        "name": "Name must be a string",
                        "type": "Type must be 'Online' or 'In Person'",
                        "startDate": "Start date must be a valid datetime",
                    }
                }
            )
        }
    }


    let where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (type) where.type = type;
    if (startDate) where.startDate = startDate;

    try {
        const allEvents = await Event.findAll({
            include: [{
                model: Group,
                attributes: [
                    'id', 'name', 'city', 'state'
                ]
            }, {
                model: Venue,
                attributes: [
                    'id', 'city', 'state'
                ]
            }],
            where,
            ...pagination,
        })
        res.json(allEvents)
    } catch(err) {
        return res.status(400).json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "page": "Page must be greater than or equal to 0",
                    "size": "Size must be greater than or equal to 0",
                    "name": "Name must be a string",
                    "type": "Type must be 'Online' or 'In Person'",
                    "startDate": "Start date must be a valid datetime",
                }
            }
        )
    }
    
})

module.exports = router;
