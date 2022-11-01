const express = require('express')
const userRouter = express.Router()
const { registerUser } = require('../Controllers/userController')

userRouter.post('/',registerUser)

module.exports = userRouter