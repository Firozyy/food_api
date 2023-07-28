import asyncHandler from "express-async-handler"
import { User } from "../model/user.js"
import { sentToken } from "../utils/token.js";

//@desc login
// rout http://localhost:4000/api/v1/register
// public

export const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please fill all filds')
    }
    let user = await User.findOne({ email })
    if (user) {
        res.status(400)
        throw new Error('already registred user')
    }

    user = await User.create({
        name, password, email
    })
    if (!user) {
        res.status(400)
        throw new Error('registration failed')
    }

    sentToken(res, user);

});

//@desc login
// rout http://localhost:4000/api/v1/login
// public

export const login = asyncHandler(async (req, res) => {
    const { password, email } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('please fill all filds')
    }
    let user = await User.findOne({ email })
    if (!user) {
        throw new Error("Invalid Email Or Password")
    }
    const ismatch = await user.matchPassword(password);
    if (!ismatch) {
        throw new Error("Invalid Email Or Password")
    }
    sentToken(res, user);

});



//@desc updateProfile
// rout http://localhost:4000/api/v1/updateProfile
// User ONLY

export const updateProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
    }

    const updatedUser = await user.save()
    if (updatedUser) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,

        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }


});

