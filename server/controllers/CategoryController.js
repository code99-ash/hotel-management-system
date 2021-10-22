const { Category } = require('../models');

const getCategories = async(req, res, next) => {
    try {
        // const categories = await Category.find().populate('rooms');
        const categories = await Category.find();
        res.json(categories).status(201)
    }catch(err) {
        next(err)
    }
}

const createCategory = async(req, res, next) => {
    try {
        const categExist = await Category.findOne({name: req.body.name})
            if(categExist)
            return res.status(400).send('Category already exists');

        const body = req.body;
        const category = await Category.create(body);
        res.json(category).status(201)
    }catch(err) {
        next(err)
    }
}

const updateCategory = async(req, res, next) => {
    try {
        const {id, name, price, active} = req.body;
        await Category.findByIdAndUpdate(id, {name, price, active})
                        .then(result => res.json(result).status(201));
    }catch(err) {
        next(err)
    }
}

const deleteCategory = async(req, res, next) => {
    try {
        await Category.findByIdAndRemove({_id: req.body._id})
        res.json('Deleted Successully').status(201);
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}