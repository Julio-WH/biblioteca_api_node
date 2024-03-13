const Joi = require('joi');
const getUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {getUserSchema}