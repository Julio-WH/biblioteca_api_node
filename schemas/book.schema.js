const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string().min(3).max(100);
const description = Joi.string().min(3).max(150);
const price = Joi.number().integer().min(10);
const status = Joi.string().min(4);
const authorId = Joi.number().integer();
const genders = Joi.array().items(Joi.number().required());

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createBookSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    authorId: authorId.required(),
    genders,
});

const updateBookSchema = Joi.object({
    name: name,
    price: price,
    description: description,
    authorId,
    genders,
});

const getBookSchema = Joi.object({
    id: id.required(),
});

const queryBookSchema = Joi.object({
   limit,
   offset
});

module.exports = { createBookSchema, updateBookSchema, getBookSchema, queryBookSchema }