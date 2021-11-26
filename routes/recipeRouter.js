const Router = require('express')
const router = new Router()
const recipeController = require('../controllers/recipeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', recipeController.create)
router.get('/', recipeController.getAll)
router.get('/:id', recipeController.getOne)
router.delete('/:id', checkRole('ADMIN'), recipeController.delete)

module.exports = router
