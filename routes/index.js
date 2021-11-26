const Router = require('express')
const router = new Router()
const recipeRouter = require('./recipeRouter')
const bookRecipesRouter = require('./bookRecipesRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const underTypeRouter = require('./underTypeRouter')
const stepRouter = require('./stepRouter')
const ingredientRouter = require('./ingredientRouter')

router.use('/user', userRouter)
router.use('/book-recipe', bookRecipesRouter)
router.use('/type', typeRouter)
router.use('/under-type', underTypeRouter)
router.use('/recipe', recipeRouter)
router.use('/step', stepRouter)
router.use('/ingredient', ingredientRouter)

module.exports = router
