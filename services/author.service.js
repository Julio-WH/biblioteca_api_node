const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class AuthorService {
    async find() {
        const rta = await models.Author.findAll();
        return rta
    }
    async findOne(id) {
        const author = await models.Author.findByPk(id, {
            include: ['books']
        });
        if (!author){
            throw boom.notFound('Author not found')
        }
        return author;
    }

    async update(id, changes) {
        const author = await this.findOne(id);
        const rta = await author.update(changes);
        return rta;
    }

    async create(data) {
        const newAuthor =  await models.Author.create(data)
        return newAuthor;
    }

    async delete(id) {
        const author =  await this.findOne(id);
        await author.destroy();
        return {id};
    }

}
module.exports = AuthorService;