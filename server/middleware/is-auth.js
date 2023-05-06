const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        console.log('No auth header');
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        console.log('No token');
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'my-private-key');
    } catch (err) {
        req.isAuth = false;
        console.log('Invalid token');
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        console.log('Invalid token');
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    console.log('Valid token');
    next();
}