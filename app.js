const express = require('express');
const api = require('./src/api/index.js');
const sequelize = require('./src/config/db.js');
const app = express();

const port = 8000;

/* Options */
app.use(express.json());

/* Router */
app.use('/api/v1', api);

sequelize.authenticate()
    .then(() => {
        sequelize.sync({ force: false })
            .then(() => {
                console.log('데이터베이스 동기화 성공')
                app.listen(port, () => {
                    console.log(' My Blog [API] Server Start....');
                    console.log(` My Blog [API] Server Port: ${port}`)
                })
            })
            .catch(err => {
                console.log('데이터베이스 동기화 에러 : ', err);
            })
    })
    .catch(err => {
        console.error('데이터베이스 연결 오류 : ', err);
    })


