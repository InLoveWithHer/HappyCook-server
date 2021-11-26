const Router = require('express')
const router = new Router()
const ingredientController = require('../controllers/ingredientController')

router.post('/', ingredientController.create)
router.get('/', ingredientController.getAll)
router.delete('/', ingredientController.deleteOne)
router.delete('/all/', ingredientController.deleteAll)

module.exports = router
