// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
// call the signup static method on the User model. 
// If the user is successfully created, then call setTokenCookie and return 
// a JSON response with the user information. 
// If the creation of the user is unsuccessful, then a Sequelize Validation
// error will be passed onto the next error-handling middleware.
router.post(
    '/join',
    validateSignup,
    async (req, res) => {
      const { email, username, firstName, lastName, password } = req.body;
      const user = await User.signup({ email, firstName, lastName, password, username });
  
      const token = await setTokenCookie(res, user);
  
      const userJson = user.toJSON();
   
      delete userJson.createdAt
      delete userJson.updatedAt
      userJson.token = token

      return res.json({
        userJson
      });
    }
  );

const checkAuth = async (req, res, next) => {
  if (!req.user) {
    const err = new Error('No log In')
    next(err);
  } else {
    next();
  }
}
router.get('/current', checkAuth, async (req, res, next) => {
  const currentUser = await User.findByPk(req.user.id);

  res.json(currentUser)
})

module.exports = router;