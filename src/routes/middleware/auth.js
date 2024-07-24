const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function authenticateJwt(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJwt;