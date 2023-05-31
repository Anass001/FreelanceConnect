import { verify } from 'jsonwebtoken';

const isAuth = (req, res, next) => {

    // console.log(req.cookies.token)

    const token = req.cookies.token; // Get the token value from the 'token' cookie

    if (!token) {
        req.isAuth = false;
        console.log('No token');
        return next();
    }

    let decodedToken;
    try {
        decodedToken = verify(token, process.env.JWT_KEY);
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

export default isAuth;