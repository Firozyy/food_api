import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import { User } from "../model/user.js"

export const isAuthanticate = asyncHandler(async (req, res, next) => {

   const { token } = req.cookies;


   if (!token) {
      res.status(401)
      throw new Error('please login')

   };

   const decoded = jwt.verify(token, process.env.JwtKey);
  const id=decoded.id
   req.user = await User.findById(id);

   next();

});

export const adminAuthanticate = (req, res, next) => {
   if (!req.user.isAdmin) {

      res.status(403)
      throw new Error('admin only')
   }
   next();
};

