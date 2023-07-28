import express, { Router } from "express";
import { login, registerUser, updateProfile } from "../controllers/userControler.js"
import { adminAuthanticate, isAuthanticate } from "../midleware/auth.js";
import { getUsers, updateUser } from "../controllers/admincontroler.js";
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").get(login)
router.route("/updateProfile").put(isAuthanticate, updateProfile)
router.route("/allusers").get(isAuthanticate, adminAuthanticate, getUsers)
router.route("/user/:id").put(isAuthanticate, adminAuthanticate, updateUser)


export default router