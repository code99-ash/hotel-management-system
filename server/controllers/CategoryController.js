const { Category } = require('../models');

const getCategories = async(req, res, next) => {
    try {
        const categories = await Category.find().populate('rooms');
        res.json(categories).status(201)
    }catch(err) {
        next(err)
    }
}

const createCategory = async(req, res, next) => {
    try {
        const categExist = await Category.findOne({name: req.body.name})
            if(categExist)
            return res.status(201).json({error: true, msg: 'Category already exists'});

        const body = req.body;
        const category = await Category.create(body);
        res.json({error: false, msg: category}).status(201)
    }catch(err) {
        next(err)
    }
}

const updateCategory = async(req, res, next) => {
    try {
        const {_id, name, price, active} = req.body;
        await Category.findByIdAndUpdate(_id, {name, price, active})
        
        const updated = await Category.findById(_id).populate('rooms')
        res.json({error: false, msg: updated});
        
    }catch(err) {
        next(err)
    }
}

const deleteCategory = async(req, res, next) => {
    try {
        await Category.findByIdAndRemove({_id: req.body.id})
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