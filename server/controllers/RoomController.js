const { Room, Category } = require('../models');

const getRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.json(rooms).status(201);

    }catch(err) {
        next(err)
    }
}

// const createRoom = async(req, res, next) => {
//     try {
//         const {room_number, category} = req.body;
//         const roomExist = await Room.findOne({room_number, category});
//         if(roomExist) return res.status(400).send('Room Number already exists');

//         const room = await Room.create(req.body);
//         const roomId = room._id;

//         const categoryUpdated = await Category.findByIdAndUpdate(category, {
//             $push: {
//                 rooms: {roomId}
//             }
//         })


//     }catch(err) {
//         next(err)
//     }
// }

module.exports = {
    getRooms
}
