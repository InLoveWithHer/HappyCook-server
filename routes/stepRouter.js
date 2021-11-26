const Router = require('express')
const router = new Router()
const stepController = require('../controllers/stepController')

router.post('/', stepController.create)
router.get('/', stepController.getAll)
router.delete('/', stepController.deleteOne)// Удаление Шага по его id
router.delete('/all/', stepController.deleteAll)// Удаление всех шагов связанных с рецептом id

module.exports = router
