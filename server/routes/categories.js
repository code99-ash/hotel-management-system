const express = require('express');
const Category = require('../model/Category');

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json(categories);
    }catch(err) {
        res.status(400).send(`Error: ${err}`)
    }
});

router.post('/', async(req, res) => {
    try {
        const {_id, name, price, image, active} = req.body;
        const updated = await Category.updateOne(
            { _id },
            { $set: { name, price, image, active } }
        )

        res.status(201).json(updated);
        
    }catch(err) {
        res.status(400).send(`Error: ${e}`);
    }

})

router.post('/update', async(req, res) => {

})

router.delete('/delete', (req, res) => {
    new Category.findByIdAndDelete({_id: req.body.id})
                .then(() => res.status(201).send('Successfully deleted Category'))
                .catch(err => res.send(`Error: ${e}`)).status(400)
})


module.exports = router;