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

// Add an Image to a Group based on the Group's id
router.post('/:groupId/new/image', checkAuth, async (req, res, next) => {
    const { groupId } = req.params;
    const { url } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    } 
    let userId = req.user.id;
    if (userId !== group.organizerId){
        res.status(403).json({
            "message": "Current User must be the organizer for the group",
            "statusCode": 403
        })
    }

    const imageableType = 'group'
    const newImage = await Image.create({
        imageableType: imageableType, 
        groupId: groupId, 
        userId: userId,
        url: url
    })
    let newImageJson = newImage.toJSON();
    delete newImageJson.userId;
    delete newImageJson.updatedAt;
    delete newImageJson.createdAt;

    res.json(newImageJson)
})



// Delete membership to a group specified by id
router.delete('/:groupId/members/:memberId', checkAuth, async (req, res, next) => {
    let { groupId, memberId } = req.params;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    } 
    let groupMemberToBeDeleted = await GroupMember.findOne({
        where:{
            groupId: groupId,
            userId: memberId
        }
    })
    if (!groupMemberToBeDeleted){
        return res.status(404).json({
            "message": "Membership between the user and the group does not exits",
            "statusCode": 404
        })
    };

    let userId = req.user.id;
    const statuesOfCurrentUser = await GroupMember.findOne({
        where: {
            userId: userId,
            groupId: groupId,
        }
    })
    if (!statuesOfCurrentUser) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to delete",
            "statusCode": 400
        })
    }

    if (!(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === userId)) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to delete",
            "statusCode": 400
        })
    }

    groupMemberToBeDeleted.destroy();
    res.json({
        "message": "Successfully deleted membership from group"
    }
)})



// Change the status of a membership for a group specified by id
router.put('/:groupId/members/change', checkAuth, async (req, res, next) => {
    let { groupId } = req.params;
    groupId = parseInt(groupId);

    let { memberId, status } = req.body;
    memberId = parseInt(memberId);

    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }

    const userId = req.user.id;
    if (group.organizerId !== userId && status === "co-host") {
        return res.status(403).json({
            "message": "Current User must be the organizer to add a co-host",
            "statusCode": 403
        })
    };

    if (status === 'pending'){
        return res.status(400).json({
            "message": "Cannot change a membership status to pending",
            "statusCode": 400
        })
    }

    const statuesOfCurrentUser = await GroupMember.findOne({
        where:{
            userId: userId,
            groupId: groupId,
        }
    })
    if (!statuesOfCurrentUser){
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to make someone a member",
            "statusCode": 400
        })
    }

    if (status === "member" && !(statuesOfCurrentUser.memberStatus === 'co-host' || group.organizerId === userId)) {
        return res.status(400).json({
            "message": "Current User must be the organizer or a co-host to make someone a member",
            "statusCode": 400
        })
    }

    let userToBeChanged = await GroupMember.findOne({
        attributes: ['id', 'userId', 'groupId', 'memberStatus'],
        where: {
            groupId: groupId,
            userId: memberId,
        },
    })

    if (!userToBeChanged) {
        return res.status(404).json({
            "message": "Membership between the user and the group does not exits",
            "statusCode": 404
        })
    }

    await userToBeChanged.update({
        memberStatus: status
    });
    await userToBeChanged.save();
    res.json(userToBeChanged)
})


// Request a Membership for a Group based on the Group's id
router.post('/:groupId/join', checkAuth, async (req, res, next) => {
    let { groupId } = req.params;
    groupId = parseInt(groupId)

    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }
    const userId = req.user.id;
    
    const allUserId = await GroupMember.findAll({
        where: {
            groupId: groupId
        },
        attributes: ['userId', 'memberStatus']
    })

    let userArr = [];
    allUserId.forEach(element => {
        userArr.push([element.dataValues.userId, element.dataValues.memberStatus])
    })
    for(let i = 0; i < userArr.length; i++){
        if (userId === userArr[i][0]){
            if (userArr[i][1] === 'pending'){
                res.status(400).json({
                    "message": "Membership has already been requested",
                    "statusCode": 400
                })  
            }
            if (userArr[i][1] === 'member'){
                res.status(400).json({
                    "message": "User is already a member of the group",
                    "statusCode": 400
                })  
            }
        }
    }

    const memberStatus = 'pending';
    const newMember = await GroupMember.create(
        {userId,
        groupId,
        memberStatus}
    )
    res.json({
        groupId: groupId,
        memberId: userId,
        status: 'pending'
    })
})

// Get all Members of a Group specified by its id
router.get('/:groupId/members', async (req, res, next) => {
    const userId = req.user.id;
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    if (!group){
        res.status(404).json({
            "message": "Group couldn't be found",
            "statusCode": 404
        })
    }

    if ( userId === group.organizerId ){
        const groupMembers = await User.scope('generalInfoForGroups').findAll(
            {
                include: [{
                    model: GroupMember,
                    where: {
                        groupId: groupId
                    },
                    attributes: ['memberStatus'],
                }],
            }
        )
        return res.json(groupMembers)
    } else {
        const groupMembers = await User.scope('generalInfoForGroups').findAll(
            {
                include: [{
                    model: GroupMember,
                    where: {
                        groupId: groupId,
                        memberStatus:{
                            [Op.in]: ['member', 'co-host'],    
                        }
                    },
                    attributes: ['memberStatus'],
                }],

            }
        )
        return res.json(groupMembers)
    }    
})


// Delete a Group
router.delete('/:groupId', checkAuth, async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    if (!group) {
        return res.status(404).json({
            message: 'Group couldn\'t be found',
            statusCode: 404
        });
    }

    if (group.organizerId !== req.user.id) {
        return res.status(403).json({
            message: 'No Authorization',
            status: 403
        })
    }
    await group.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

// Edit a Group
router.put('/:groupId', checkAuth, async (req, res, next) => {

    try{
        
        const { groupId } = req.params;  
        const userId = req.user.id;
        const groupToBeEdited = await Group.findByPk(groupId)

        if (!groupToBeEdited) {
            return res.status(404).json({
                "message": "Group couldn't be found",
                "statusCode": 404
            })
        }
        if (groupToBeEdited.organizerId !== userId ) {
            return res.status(403).json({
                message: 'No Authentication',
                status: 403
            })
        }
        
        let { name, about, type, private, city, state } = req.body;
        if (private === 'true') {
            private = true
        } else if (private === 'false') {
            private = false
        }

        if (name) groupToBeEdited.name = name;
        if (about) groupToBeEdited.about = about;
        if (type) groupToBeEdited.type = type;
        if (private) groupToBeEdited.private = private;
        if (city) groupToBeEdited.city = city;
        if (state) groupToBeEdited.state = state;
        await groupToBeEdited.save();

        res.json(groupToBeEdited)

    } catch(err){
        res.status(400).json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "name": "Name must be 60 characters or less",
                    "about": "About must be 50 characters or more",
                    "type": "Type must be Online or In person",
                    "private": "Private must be a boolean",
                    "city": "City is required",
                    "state": "State is required",
                }
            }
        )

    }
})



// Create a Group
router.post('/new', checkAuth, async (req, res, next) => {
    let { name, about, type, private, city, state } = req.body;
    const organizerId = req.user.id
    try{
        if (private === 'true'){
            private = true
        } else if (private === 'false'){
            private = false
        }
        const newGroup = await Group.create({
            organizerId, name, about, type, private, city, state
        });
        
        res.json({ newGroup })
    } catch (err) {
        res.status(400).json(
            {
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "name": "Name must be 60 characters or less",
                    "about": "About must be 50 characters or more",
                    "type": "Type must be Online or In person",
                    "private": "Private must be a boolean",
                    "city": "City is required",
                    "state": "State is required",
                }
            }
        )
    }

})

router.get('/users/current', checkAuth, async (req, res, next) => {

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




