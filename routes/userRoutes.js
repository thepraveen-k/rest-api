const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.post ('/sign-up', userController.signup)



module.exports = router;