const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize')
class BooksService {
    options = {
        include: [{
            association: "author",
            attributes: ["id", "name", "lastName"]
        },{
            association: 'genders',
            through: { attributes: [] },
            attributes: ["id", 'name']
        }],
    }

    async find(query) {

        const { limit, offset } = query
        if(limit && offset){
            this.options.limit = limit;
            this.options.offset = offset;
        }
        const rta = await models.Book.findAll(this.options);
        return rta
    }

    async findOne(id) {
        const book = await models.Book.findByPk(id, this.options);
        if (!book){
            throw boom.notFound('Book not found')
        }
        return book;
    }

    async update(id, changes) {
        const book = await this.findOne(id);
        const rta = await book.update(changes);
        return rta;
    }

    async create(data) {
        const newBook =  await models.Book.create(data)
        return newBook;
    }

    async delete(id) {
        const book =  await this.findOne(id);
        await book.destroy();
        return {id};
    }
}

module.exports = BooksService;