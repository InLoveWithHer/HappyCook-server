const {Book_recipes, Type, Under_type} = require("../models/models");
const ApiError = require("../error/ApiError");

class bookRecipesController {
    async addOne(req, res) {
        const {recipeId} = req.params
        const {bookId} = req.body
        const bookRecipe = await Book_recipes.create({bookId, recipeId})
        return res.json(bookRecipe)
    }

    async getAll(req, res) {
        let {bookId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const bookRecipe = await Book_recipes.findAll( {where:{bookId}, limit, offset} )
        return res.json(bookRecipe)
    }

    async delete(req, res, next) {
        const {recipeId, bookId} = req.body
        const bookRecipe = (await Book_recipes.findOne({
            where: {bookId: bookId, recipeId: recipeId},
        }))
        if (!bookRecipe) {
            return next(ApiError.badRequest('Книги с таким ID нет.'))
        } else {
            await Book_recipes.destroy({where: {id: bookRecipe.id}})
            return await res.sendStatus(200)
        }
    }
}

module.exports = new bookRecipesController()