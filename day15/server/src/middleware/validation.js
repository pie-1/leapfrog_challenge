const { body, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  };
};

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .custom((email) => {
      const domain = email.split('@')[1];
      if (domain !== process.env.COLLEGE_EMAIL_DOMAIN) {
        throw new Error(`Please use your college email (${process.env.COLLEGE_EMAIL_DOMAIN})`);
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('Password must contain at least one letter and one number'),
  body('password_confirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('faculty')
    .isIn(['BE Computer', 'Architecture', 'Civil', 'BIT'])
    .withMessage('Invalid faculty selection'),
  body('studentStatus')
    .isIn(['current', 'passed_out'])
    .withMessage('Invalid student status'),
  body('semester')
    .if(body('studentStatus').equals('current'))
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8'),
  body('graduationYear')
    .if(body('studentStatus').equals('passed_out'))
    .isInt({ min: 2000, max: 2100 })
    .withMessage('Invalid graduation year'),
  validate
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const validateItem = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('category')
    .isIn(['books', 'tools', 'games'])
    .withMessage('Invalid category'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('condition')
    .isIn(['New', 'Like New', 'Good', 'Fair', 'Poor'])
    .withMessage('Invalid condition'),
  body('number_of_items')
    .isInt({ min: 1, max: 10 })
    .withMessage('Number of items must be between 1 and 10'),
  validate
];

const validateBorrowRequest = [
  body('item_id')
    .isMongoId()
    .withMessage('Invalid item ID'),
  body('expected_return_date')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expected return date must be in the future');
      }
      return true;
    }),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  validate
];

module.exports = {
  validate,
  validateRegister,
  validateLogin,
  validateItem,
  validateBorrowRequest
};