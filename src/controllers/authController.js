const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signToken = (data) => {
    return jwt.sign(data, process.env.MY_SECRET, {
        expiresIn: '3d'
    });
}

const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, gender, age, hobby, phone, image } = req.body
        const newUser = await User.create({ name, email, password, confirmPassword, gender, age, hobby, phone })

        const token = signToken({
            id: newUser._id,
            name: newUser.Name,

            email
        })
        res.status(201).json({
            status: "success",
            token,
            data: newUser
        })
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            data: err.message
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            const token = signToken({ id: user._id, email: user.email });

            res.status(200).json({
                status: 'success',
                token,
                data: user,
            });
        } else {

            res.status(403).json({
                status: 'fail',
                data: "Invalid Password"
            })
        }
    } catch (err) {

        res.status(500).json({
            status: 'fail',
            data: err
        })
    }
};
module.exports = { signUp, login }