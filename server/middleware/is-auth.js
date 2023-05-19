const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.cookies.token; // Get the token value from the 'token' cookie

    if (!token) {
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
