const { Room, Category } = require('../models');

const getRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
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

        res.json(room).status(201);


    }catch(err) {
        next(err)
    }
}

const updateRoom = async(req, res, next) => {
    try {
        const {id, room_number, active, status } = req.body;
        await Room.findByIdAndUpdate( id, {room_number, active, status})

        const updated = await Room.findById(id);
        res.json(updated)

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
