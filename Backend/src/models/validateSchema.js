const Joi = require('joi');

const joiUserSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Username must be a string',
        'any.required': 'Username is required'
    }),
    profilePic: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required'
    })
});

module.exports = { joiUserSchema };
