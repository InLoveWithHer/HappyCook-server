const Router = require('express')
const router = new Router()
const underTypeController = require('../controllers/underTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', underTypeController.create)
router.get('/', underTypeController.getAll)
router.delete('/:id', checkRole('ADMIN'), underTypeController.delete)

module.exports = router
