const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize')

class UserService {

    async create(data) {
        const exist_user = await this.findOneUsername(data.username, true);
        if(exist_user){
            throw boom.notFound('Ya existe un usario con ese username')
        }
        const newUser =  await models.User.create(data);
        return newUser;
    }

    async findOneUsername(username, validate=false) {
        const user = await models.User.findOne({where:{username: username}});
        if (!user){
            if(validate){
                return false
            }
            throw boom.notFound('User not found')
        }
        return user;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user){
            throw boom.notFound('User not found')
        }
        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        if('username' in changes && user.dataValues.username == 'admin' && changes.username !== user.dataValues.username){
            throw boom.notFound('No puedes cambiar el username del usuario Admin')
        }        
        if('username' in changes && user.dataValues.username !== 'admin' ){
            const exist_user = await this.findOneUsername(changes.username, true);
            if(exist_user){
                throw boom.notFound('Ya existe un usario con ese username')
            }
        }
        const rta = await user.update(changes);

        return rta;
    }

}

module.exports = UserService;