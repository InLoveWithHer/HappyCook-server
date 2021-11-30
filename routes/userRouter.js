const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check) //, authMiddleware
router.delete('/', checkRole('ADMIN'), userController.delete)
router.put('/edit-photo/:id', userController.editPhoto)

module.exports = router
