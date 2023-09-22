const express = require('express');
const BooksService = require('../services/books.service');
const AuthorService = require('../services/author.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createBookSchema, updateBookSchema, getBookSchema, queryBookSchema } = require('../schemas/book.schema');

const router = express.Router();
const service = new BooksService();
const serviceAthor = new AuthorService();

router.get('/', validatorHandler(queryBookSchema, 'query'),
    async (req, res, next) => {
    try{
        const books = await service.find(req.query);
        res.json(books);
    } catch (error) {
        next(error);
    }

});

router.post('/',
    validatorHandler(createBookSchema, 'body'),
    async (req, res) => {
    const body = req.body;
    try {
        const getAuthor = await serviceAthor.findOne(body.authorId)
    } catch (error) {
        if(error.isBoom){
            const {output} = error
            res.status(output.statusCode).json(output.payload.message);
        }else{
            res.status(500).json(error.message);
        }
    }
    
    const newBook = await service.create(body);
    res.status(201).json(newBook);
});

router.get('/:id',
    validatorHandler(getBookSchema, 'params'),
    async (req, res, next) => {
    try {
        const {id} = req.params;
        const book = await service.findOne(id);
        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id',
    validatorHandler(getBookSchema, 'params'),
    validatorHandler(updateBookSchema, 'body'),
    async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const book = await service.update(id, body);
        res.json(book);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',
    validatorHandler(getBookSchema, 'params'),
    async (req, res) => {
      const { id } = req.params;
        try {
            const rta = await service.delete(id);
            res.json(rta);
        }
        catch (error) {
            next(error);
        }
});

module.exports = router;