const User = require('../models/User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    let emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com]/;

    const existUser = await User.findOne({email});

    if (!emailRegex.test(email)) {
        throw ("Invalid email");
    } else if (password.length < 6) {
        throw ("Password most be at least 5 character long.");
    }else if (existUser){
        throw ("User with email already exist!");
    }

    const user = new User({name, email, password: sha256(password + process.env.SALT),});

    await user.save();

    await res.json({
        message: `User: ${name} registered successfully!`
    })

};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email, password: sha256(password + process.env.SALT)});

    if (!user) throw 'Email and Password did not match!';

    const token = await jwt.sign({id: user.id}, process.env.SECRET);
    await res.json({
        message: "User logged in successful",
        token,
    })
};