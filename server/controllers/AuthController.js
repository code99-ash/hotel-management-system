const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Register = async (req, res, next) => {
    
    const {first_name, last_name, email, password, role, mobile_number} = req.body;

    const emailExist = await User.findOne({email})
    if(emailExist)
        return res.status(400).send('Email already exists');

    // Hash Password
    const salt = await bcrypt.genSaltSync(10);
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
        await user.save();
        res.status(201).json({user: user._id});
    } catch(err) {
        next(err)
    }
}

const Login = async(req, res, next) => {
    try {
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
    }catch(err) {
        next(err)
    }
}

module.exports = {
    Register,
    Login
}

