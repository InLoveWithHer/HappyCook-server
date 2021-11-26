const {Type, Under_type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)

    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const type = (await Type.findOne({where: {id}}))
        if (!type) {
            return next(ApiError.badRequest('Типа с таким ID нет.'))
        } else {
            await Under_type.destroy({where: {typeId: type.id}})
            await type.destroy()
            return await res.sendStatus(200)
        }
    }
}

module.exports = new TypeController()