
import mongoose from "mongoose";
import bcrypt from "bcrypt"
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},
    {
        timestamps: true,

    })
    schema.methods.matchPassword = async function (enteredPassword) {

        return await bcrypt.compare(enteredPassword, this.password)
      
      }
      schema.pre('save', async function (next) {
        if (!this.isModified('password')) {
          next()
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
      
      })
    export  const User = mongoose.model("user",schema)