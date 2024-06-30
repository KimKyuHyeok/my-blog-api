const { Sequelize } = require('sequelize');
require('dotenv').config()

const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    port: port
});

sequelize.authenticate()
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch(err => {
        console.log('데이터베이스 연결 오류 : ', err);
    })


module.exports = sequelize;