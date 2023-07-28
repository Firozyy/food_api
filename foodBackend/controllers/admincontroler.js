
import asyncHandler from "express-async-handler";
import Menu from "../model/menu.js";
import { User } from "../model/user.js";


//@desc createMenu
// rout http://localhost:4000/api/v1/register
//admin ONLY

export const createMenu = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        description,
        price,
    } = req.body;

    if (!name || !price || !category || !description) {
        res.status(404)
        throw new Error("please fill  all fields")
    }

    const menu = new Menu({
        name,
        price,
        user: req.user._id,
        category,
        numReviews: 0,
        description,
    })

    const cratedMenu = await menu.save()
    res.status(201).json(cratedMenu)
});

//@desc deletemenu
// rout http://localhost:4000/api/v1/menu/:id
//admin ONLY

export const deletemenu = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const menu = await Menu.findById(id);
    if (!menu) {
        res.status(404)
        throw new Error('menu Not Found')
    } else {
        await await menu.deleteOne({ id });
        res.json({
            message: 'menu removed successfully'
        })
    }

});


//@desc get all users
// rout http://localhost:4000/api/v1/allusers
//admin ONLY

export const getUsers = asyncHandler(async (req, res) => {

    const user = await User.find().select("-password")
    if (!user) {
        res.status(404)
        throw new Error('NO Uers')
    } else {
        res.json(user)
    }

});

//@desc update user info & admin
// rout http://localhost:4000/api/v1/user/:id
// admin only
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (user) {

        user.isAdmin = req.body.isAdmin || user.isAdmin

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


//@desc updateProdut
//  http://localhost:4000/api/v1/menu/:id
// admin only
export const updateProdut = asyncHandler(async (req, res) => {

    const { name, price, description, category } = req.body

    const menu = await Menu.findById(req.params.id)

    if (menu) {
        menu.name = name || menu.name
        menu.price = price || menu.price
        menu.description = description || menu.description

        menu.category = category || menu.category


        const updatedMenu = await menu.save()
        res.json(updatedMenu)
    } else {
        res.status(404)
        throw new Error("product not found")
    }



});