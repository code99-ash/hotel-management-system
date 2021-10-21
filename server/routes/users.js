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
        res.json(`Error ${e}`).status(400)
    }
});

router.post('/register', async(req, res) => {
    const {first_name, last_name, email, password, role, mobile_number} = req.body;
    
    const emailExist = await User.findOne({email});
    if(emailExist)
        return res.status(400).send('Email already exists');

    // Hash Password
    const salt = await bcrypt.getSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role, 
        mobile_number
    });

    try {
        const savedUser = await user.save();
            res.status(201).json({user: user._id});
    } catch(err) {
        res.status(400).send(`Error: ${err}`);
    }
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user)
        return res.status(400).send('Invalid Email/Password');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword)
        return res.status(400).send('Invalid Email/Password');
    
        // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;