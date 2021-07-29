const User = require('../models/User');

const getAllUser = async (req, res) => {
    let data = await User.find();
    res.status(200).json({
        status: 'success',
        data: data
    })
}
const createUser = async (req, res) => {
    try {
        //const { name, email, phone, gender, hobby, image } = req.body
        let create = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: create
        })
    } catch (err) {
        res.status(400).json({
            status: 'success',
            data: err.message
        })
    }
}
const getOneUser = async (req, res) => {
    try {
        let data = await User.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: 'success',
            data: err.message
        })
    }
}
const updateUser = async (req, res) => {
    try {

        let data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(203).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: 'success',
            data: err.message
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let data = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(500).json({
            status: 'success',
            data: err.message
        })
    }
}



module.exports = { getAllUser, createUser, getOneUser, updateUser, deleteUser };