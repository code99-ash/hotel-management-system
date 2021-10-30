const { Room } = require('../models');

const fetchAvailable = (req, res, next) => {
    const {category} = req.body;
    
    try {
        Room.find({})
            .where('status').equals('vacant')
            .where('category').equals(category)
            .where('active').equals(true)
            .exec(function (err, vacants) {
                if(err)
                    console.log(err)
                
                    res.json(vacants)
            })

    }catch(err) {
        res.send(err);
    }
}

module.exports = {
    fetchAvailable
}