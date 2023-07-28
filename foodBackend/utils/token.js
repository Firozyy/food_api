import jwt from "jsonwebtoken";

export const sentToken = function (res, user,) {
    const id = user._id
    const token = jwt.sign({ id }, process.env.JwtKey, {
        expiresIn: "30d"
    })

    // const options = {
    //     expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //
    // };


    res.status(200).cookie("token", token).json(user)



}