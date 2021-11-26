const sequelize = require('../db')
const {TEXT} = require("sequelize");
const {STRING} = require("sequelize");
const {INTEGER} = require("sequelize");

const User = sequelize.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: STRING, unique: true},
    email: {type: STRING, unique: true},
    password: {type: STRING, allowNull: false},
    img: {type: STRING, defaultValue: "initial_photo.png"},
    role: {type: STRING, defaultValue: "USER"}
})

const Book = sequelize.define('book', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true}
})

const Book_recipes = sequelize.define('book_recipes', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
})

const Recipe = sequelize.define('recipe', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, allowNull: false},
    cooking_time: {type: STRING, allowNull: false},
    rating: {type: INTEGER, defaultValue: 0},
    img: {type: STRING, allowNull: false},
    description: {type: TEXT}
})

const Under_type = sequelize.define('under_type', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false}
})

const Step = sequelize.define('step', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    depiction: {type: STRING, unique: true, allowNull: false},
    step_number: {type: INTEGER, allowNull: false}
})

const Ingredient = sequelize.define('ingredient', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
    description: {type: STRING, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: INTEGER, allowNull: false},
    comment: {type: STRING,}
})

User.hasOne(Book)
Book.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Book.belongsToMany(Recipe, {through: Book_recipes})
Recipe.belongsToMany(Book, {through: Book_recipes})

Type.hasMany(Recipe, {as: 'type'});
Recipe.belongsTo(Type)

Type.hasMany(Under_type)
Under_type.belongsTo(Type)

Under_type.hasMany(Recipe, {as: 'under_type'});
Recipe.belongsTo(Under_type)

Recipe.hasMany(Step, {as: 'step'});
Step.belongsTo(Recipe)

Recipe.hasMany(Ingredient,{as: 'ingredient'});
Ingredient.belongsTo(Recipe)

module.exports = {
    User,
    Book,
    Book_recipes,
    Recipe,
    Rating,
    Step,
    Type,
    Under_type,
    Ingredient,
}





