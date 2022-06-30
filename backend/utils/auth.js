// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Setting the JWT cookie after a user is logged in or signed up
// It takes in the response and the session user and generates a JWT using the imported secret.
// Sends a JWT cookie
const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        // set to expire in however many seconds you set on the JWT_EXPIRES_IN key in the .env file.
        { expiresIn: parseInt(expiresIn) } // 604800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
};


// Restore the session user based on the contents of the JWT cookie.
// Create a middleware function that will verify and parse the JWT's payload 
// and search the database for a User with the id in the payload. 
// (This query should use the currentUser scope since the hashedPassword is not needed for this operation.) 
// If there is a User found, then save the user to a key of user onto the Request, req.user. 
// If there is an error verifying the JWT or a User cannot be found with the id, 
// then clear the token cookie from the response and set req.user to null.

// The restoreUser middleware will be connected to the API router 
// so that all API route handlers will check if there is a current user logged in or not.
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (err) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');
        return next();
    });
};


// Requiring a session user to be authenticated before accessing a route.
// If there is no current user, return an error

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };