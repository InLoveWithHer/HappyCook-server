const {Step} = require('../models/models')
const ApiError = require('../error/ApiError');

class stepController {
    async create(req, res) {
        const {depiction, step_number, recipeId} = req.body
        const step = await Step.create({depiction, step_number, recipeId})
        return res.json(step)
    }

    async getAll(req, res) {
        const {recipeId} = req.body
        const steps = await Step.findAll({where: {recipeId}})
        return res.json(steps)
    }

    async deleteOne(req, res, next) {
        const {id} = req.body
        const step = (await Step.findOne({where: {id}}))
        if (!step) {
            return next(ApiError.badRequest('Шага с таким ID нет.'))
        } else {
            await step.destroy()
            return res.sendStatus(200)
        }
    }

    async deleteAll(req, res, next) {
        const {recipeId} = req.body
        const steps = (await Step.destroy({where: {recipeId}}))
        if (!steps) {
            return next(ApiError.badRequest('Шагов для рецепта с таким ID нет.'))
        } else {
            return res.sendStatus(200)
        }


    }
}

module.exports = new stepController()