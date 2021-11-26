const {Under_type} = require('../models/models')
const ApiError = require('../error/ApiError');

class UnderTypeController {
    async create(req, res) {
        const {name, typeId} = req.body
        const under_type = await Under_type.create({name, typeId})
        return res.json(under_type)
    }

    async getAll(req, res) {
        const under_types = await Under_type.findAll()
        return res.json(under_types)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const under_type = (await Under_type.findOne({
            where: {id},
        }))
        if (!under_type) {
            return next(ApiError.badRequest('Подтипа с таким ID нет.'))
        } else {
            await under_type.destroy()
            return res.sendStatus(200)
        }
    }
}

module.exports = new UnderTypeController()