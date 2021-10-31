const { Room, Category } = require('../models');

const getRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find()
                                .select('room_number active status createdAt updatedAt category')
                                .populate({path: 'category', select: 'name'});
        res.json(rooms).status(201);

    }catch(err) {
        next(err)
    }
}

const createRoom = async(req, res, next) => {
    try {
        const {room_number, category} = req.body;
        const roomExist = await Room.findOne({room_number, category});
        if(roomExist) return res.status(400).send('Room Number already exists');



        const room = await Room.create(req.body);
        const roomId = room._id;

        await Category.findByIdAndUpdate(category, {
            $push: {
                rooms: roomId
            }
        })

        const newRoom = await Room.findById(room._id)
                                .select('room_number active status createdAt updatedAt category')
                                .populate({path: 'category', select: 'name'});

        res.json({error: false, msg: newRoom}).status(201);


    }catch(err) {
        next(err)
    }
}

const updateRoom = async(req, res, next) => {
    try {
        const {id, room_number, active, status, category } = req.body;
        await Room.findByIdAndUpdate( id, {room_number, active, status, category})

        const updated = await Room.findById(id)
                                .select('room_number active status createdAt updatedAt category')
                                .populate({path: 'category', select: 'name'});
        res.json({error: false, msg: updated});

    }catch(err) {
        next(err)
    }
}

const deleteRoom = async(req, res, next) => {
    try {
        const {id, category} = req.body;
        await Room.findByIdAndRemove(id);
        await Category.findByIdAndUpdate(category, {
            $pull: {
                rooms: id
            }
        })
        res.send('Successfully deleted')
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom
}
