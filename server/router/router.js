const express = require('express')
const authRouter = require('./userRouter')

const router = express.Router()

router.use('/auth', authRouter)

module.exports = router