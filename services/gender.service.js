const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class GenderService {
    async find() {
        const rta = await models.Gender.findAll();
        return rta
    }
}

module.exports = GenderService;