const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    image: {
        type: String
    },
    gender: {
        type: String,

        enum: ["male", "femail", "other"],
        default: "male"
    },
    phone: {
        type: Number,
        require: true

    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please use another email']

    },
    hobby: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true,
        validate: {
            validator: function (confirmPassword) {
                // console.log(this.password, passwordConfirm)
                return confirmPassword === this.password;
            },
            message: "password must be same"
        },

    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    }
)



userSchema.pre('save', async function (next) {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;