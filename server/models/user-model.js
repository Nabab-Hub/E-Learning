const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        default: 'student',
        },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

// secure the password with the bcrypt
userSchema.pre('save', async function(next){
    // console.log('pre method :', this);
    const user = this

    if (!user.isModified('password')) {
        next()
    }

    try {
        // hash the password 
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}


// json web token
userSchema.methods.generateToken = async function (){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '30d'
        }
    )
    } catch (error) {
        console.error(error)
    }
}


// define the model or collection name
const User = new mongoose.model('User', userSchema)

module.exports = User;