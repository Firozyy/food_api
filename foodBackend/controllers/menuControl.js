
import asyncHandler from "express-async-handler"
import Menu from "../model/menu.js";

//@desc get all food items
// rout http://localhost:4000/api/v1/allmenu
//public

export const getMenu = asyncHandler(
    async (req, res) => {

        const menu = await Menu.find()

        res.json(menu)

    })

//@desc getSingle food items
// rout http://localhost:4000/api/v1/menu/:id
//public

export const getSinglemenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id)

    if (!menu) {
        res.status(404)
        throw new Error('menu not found')

    }
    res.json(menu)

})