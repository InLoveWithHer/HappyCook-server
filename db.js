const {Sequelize} = require('sequelize')


if (process.env.DATABASE_URL) {
    module.exports = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    });
} else {
    module.exports = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    )
}
