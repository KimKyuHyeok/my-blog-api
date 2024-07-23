const express = require('express');
const api = require('./src/routes/index.js');
const sequelize = require('./src/config/db.js');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

const port = 80;

/* Options */
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, './views')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));


/* Router */
app.use(api);

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


