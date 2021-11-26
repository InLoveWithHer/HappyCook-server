const {Ingredient} = require('../models/models')
const ApiError = require('../error/ApiError');

class ingredientController {
    async create(req, res) {
        const {name ,description, recipeId} = req.body
        const ingredient = await Ingredient.create({name, description, recipeId})
        return res.json(ingredient)
    }

    async getAll(req, res) {
        const {recipeId} = req.body
        const ingredients = await Ingredient.findAll({where: {recipeId}})
        return res.json(ingredients)
    }

    async deleteOne(req, res, next) {
        const {id} = req.body
        const ingredient = (await Ingredient.findOne({where: {id}}))
        if (!ingredient) {
            return next(ApiError.badRequest('Ингредиента с таким ID нет.'))
        } else {
            await ingredient.destroy()
            return res.sendStatus(200)
        }
    }

    async deleteAll(req, res, next) {
        const {recipeId} = req.body
        const ingredients = (await Ingredient.destroy({where: {recipeId}}))
        if (!ingredients) {
            return next(ApiError.badRequest('Ингредиентов для рецепта с таким ID нет.'))
        } else {
            return res.sendStatus(200)
        }


    }
}

module.exports = new ingredientController()