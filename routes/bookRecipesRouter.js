const Router = require('express')
const router = new Router()
const bookRecipesController = require('../controllers/bookRecipesController')

router.post('/:recipeId', bookRecipesController.addOne)
router.get('/', bookRecipesController.getAll)
router.delete('/', bookRecipesController.delete)

module.exports = router
