const {Book_recipes} = require("../models/models");

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

    async delete(req, res) {

    }
}

module.exports = new bookRecipesController()