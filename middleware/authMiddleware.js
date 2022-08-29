const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

//token : bearer token(every token starts with bearer)
const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //GET USER FROM TOKEN

            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch (error) {
            console.log(error)
            res.statusCode = 401;
            throw new Error("not authorized")
        }
    }
    if (!token) {
        res.statusCode = 401;
        throw new Error("not authorized", "no token")
    }
})

module.exports = { protect }