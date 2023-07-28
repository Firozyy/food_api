import express, { Router } from "express";
import { getMenu, getSinglemenu } from "../controllers/menucontrol.js";
import { adminAuthanticate, isAuthanticate } from "../midleware/auth.js";
import { createMenu, deletemenu, updateProdut } from "../controllers/admincontroler.js";
const router = express.Router();

router.route("/createmenu").post(isAuthanticate, adminAuthanticate, createMenu);
router.route("/allmenu").get(getMenu);
router.route("/menu/:id")
    .delete(isAuthanticate, adminAuthanticate, deletemenu)
    .get(getSinglemenu)
    .put(isAuthanticate, adminAuthanticate, updateProdut);


export default router