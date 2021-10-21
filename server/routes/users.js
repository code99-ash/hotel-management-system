const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/User')

router.get('/', async(req, res) => {
    try {
        const users = await User.find().limit(100);
            res.json(users).status(201)
    }catch(err){
        