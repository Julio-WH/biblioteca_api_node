const express = require('express');
const BooksService = require('../services/books.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createBookSchema, updateBookSchema, getBookSchema, queryBookSchema } = require('../schemas/book.schema');

const router = express.Router();
const service = new BooksService();

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
    console.log(body)
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