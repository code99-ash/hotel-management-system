const fs = require('fs');

const { Room, Category } = require('../models');
var upload = require('../middleware/upload-middleware');

const getCategories = async(req, res, next) => {
    try {
        const categories = await Category.find().populate('rooms');
        res.json(categories).status(201)
    }catch(err) {
        next(err)
    }
}

const createCategory = async (req, res, next) => {
    try {
            const uploaded = upload(req, res, function(err) {
                if(err) {
                    res.status(400).json({"error": true, type: 'fileError', msg: err});
                }else {

                    const ext = req.file.filename.split('.')[1];
                    const newName = req.body.name + '.' + ext; 
                    
                    try {

                        const category = Category.create({...req.body, image: newName}, function(error, data) {
                            if(error) {

                                fs.unlink(`./gallery/${req.file.filename}`,(err) => {
                                    if(err)
                                        console.log('Unable to delete file', err)
                                })
                                if(error.code === 11000) {
                                    res.json({error: true, msg: 'Category name already exist'});
                                }else {
                                    res.json({error: true, msg: error});
                                }

                            }else {
                                fs.rename(`./gallery/${req.file.filename}`,`./gallery/${newName}`, (err) => {
                                    if(err)
                                        console.log('Unable to rename file')
                                })
                                res.json({errorUpload: false, msg: data}).status(201)
                            }
                        });
                        

                    }catch(err) {
                       next(err)
                    }
                    
                }
            })

        }catch(err) {
            next(err)
            // res.status(401).json({error: true, msg: err})
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
        const categ = await Category.findByIdAndRemove({_id: req.body.id})
        await Room.deleteMany({category: req.body.id});

        fs.unlink(`./gallery/${categ.image}`,(err) => {
            if(err)
                console.log('Unable to delete file', err)
        })

        res.json('Deleted Successully').status(201);
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}

// module.exports = CategoryController