const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string().min(3).max(100);
const lastName = Joi.string().min(3).max(150);

const createAuthorSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
});

const updateAuthorSchema = Joi.object({
    name: name,
    lastName: lastName,
});

const getAuthorSchema = Joi.object({
    id: id.required(),
});

module.exports = { createAuthorSchema, updateAuthorSchema, getAuthorSchema }