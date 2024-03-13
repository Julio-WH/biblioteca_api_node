const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize')

class UserService {

    async findOne(username) {
        const user = await models.User.findOne({where:{username: username}});
        if (!user){
            throw boom.notFound('User not found')
        }
        return user;
    }

}

module.exports = UserService;