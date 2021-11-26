const uuid = require('uuid')
const path = require('path');
const {Recipe, Step, Ingredient, Type, Under_type, Book_recipes} = require('../models/models')
const ApiError = require('../error/ApiError')

class RecipeController {
    async create(req, res, next) {
        try {
            let {name, cooking_time, description, underTypeId, typeId, step, ingredient} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const recipe = await Recipe.create({
                name,
                cooking_time,
                description,
                underTypeId,
                typeId,
                img: fileName,
                step,
                ingredient
            });

            if (ingredient) {
                ingredient = JSON.parse(ingredient)
                ingredient.forEach(i =>
                    Ingredient.create({
                        name: i.name,
                        description: i.description,
                        recipeId: recipe.id
                    })
                )
            }

            if (step) {
                step = JSON.parse(step)
                step.forEach(i =>
                    Step.create({
                        depiction: i.depiction,
                        step_number: i.step_number,
                        recipeId: recipe.id
                    })
                )
            }

            return res.json(recipe)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {typeId, underTypeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let recipes;
        if (!typeId && !underTypeId) {
            recipes = await Recipe.findAndCountAll({limit, offset})
        }
        if (typeId && !underTypeId) {
            recipes = await Recipe.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (!typeId && underTypeId) {
            recipes = await Recipe.findAndCountAll({where: {underTypeId}, limit, offset})
        }
        if (typeId && underTypeId) {
            recipes = await Recipe.findAndCountAll({where: {typeId, underTypeId}, limit, offset})
        }
        return res.json(recipes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const recipe = await Recipe.findOne(
            {
                where: {id},
                include: [
                    {model: Step, as: 'step'},
                    {model: Ingredient, as: 'ingredient'},
                    {model: Type, as: 'type'},
                    {model: Under_type, as: 'under_type'}
                ],
            },
        )
        return res.json(recipe)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const recipe = (await Recipe.findOne({where: {id}}))
        console.log(id)
        if (!recipe) {
            return next(ApiError.badRequest('Рецепта с таким ID нет.'))
        } else {
            await Step.destroy({where: {recipeId: id}})
            await Ingredient.destroy({where: {recipeId: id}})
            await Book_recipes.destroy({where: {recipeId: id}})
            await recipe.destroy()

            return res.sendStatus(200)
        }
    }
}

module.exports = new RecipeController()