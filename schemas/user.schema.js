const Joi = require('joi');
const username = Joi.string()
const password = Joi.string()
const role = Joi.string().valid('admin', 'user', 'librarian', 'visitor')

const createUserSchema = Joi.object({
    username: username,
    password: password,
    role:role,
});

const getUserSchema = Joi.object({
    username: username.required(),
    password: password,
});

const updateUserSchema = Joi.object({
    username: username,
    password: password,
    role:role,
});

module.exports = {createUserSchema, getUserSchema, updateUserSchema}