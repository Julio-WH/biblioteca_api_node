const express = require('express');
const AuthorService = require('../services/author.service');
const validatorHandler = require('../middlewares/validator.handler');

const { createAuthorSchema, updateAuthorSchema, getAuthorSchema } = require('../schemas/author.schema');

const router = express.Router();
const service = new AuthorService();

router.get('/', async (req, res) => {
    const authors = await service.find();
    res.json(authors);
});

router.post('/',
    validatorHandler(createAuthorSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newAuthor = await service.create(body);
        res.status(201).json(newAuthor);
    });

router.get('/:id',
    validatorHandler(getAuthorSchema, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const author = await service.findOne(id);
            res.json(author);
        } catch (error) {
            next(error);
        }
    });

router.patch('/:id',
    validatorHandler(getAuthorSchema, 'params'),
    validatorHandler(updateAuthorSchema, 'body'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const body = req.body;
            const author = await service.update(id, body);
            res.json(author);
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id',
    validatorHandler(getAuthorSchema, 'params'),
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