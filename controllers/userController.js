const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path');
const jwt = require('jsonwebtoken')
const db = require("express");
const {User, Book, Recipe, Step, Ingredient, Book_recipes} = require('../models/models')

const generateJwt = (id, email, login, role, img) => {
    return jwt.sign(
        {id, email, login, role, img},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, login, password} = req.body
        if (!email || !login || !password) {
            return next(ApiError.badRequest('Некорректный email, password или login'))
        }
        const candidate1 = await User.findOne({where: {email}})
        const candidate2 = await User.findOne({where: {login}})
        if (candidate1) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        if (candidate2) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        // const {img} = 'initial_photo.png'
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, login, password: hashPassword})
        const book = await Book.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.login, user.role, user.img)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким login не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Пароль введён не верно'))
        }
        const token = generateJwt(user.id, user.email, user.login, user.role, user.img)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.login, req.user.role, req.user.img)
        return res.json({token})
    }

    async delete(req, res, next) {
        const {login} = req.body
        const user = (await User.findOne({where: {login}}))
        if (!user) {
            return next(ApiError.badRequest('Пользователя с таким логином нет.'))
        } else {
            await Book.destroy({where: {userId: user.id}})
            await Book_recipes.destroy({where:{userId: user.id}})
            await user.destroy()

            return res.sendStatus(200)
        }
    }

    async editPhoto(req, res, next) {
        /*
        try {
            let {id} = req.params
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const user = await User.findOne({where:{id}})
            console.log(user)
            return res.sendStatus(200)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        } */
    }
}

module.exports = new UserController()