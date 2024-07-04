function isAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.render('admin/password');
    }
}

module.exports = isAuth;