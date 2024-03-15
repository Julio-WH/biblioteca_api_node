const Joi = require('joi');
const username = Joi.string()
const password = Joi.string().required()
const getUserSchema = Joi.object({
    username: username.required(),
    password: password,
});

const updateUserSchema = Joi.object({
    username: username,
    password: password,
});

module.exports = {getUserSchema, updateUserSchema}