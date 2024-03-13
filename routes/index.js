const express = require('express');
const booksRouter = require('./books.router');
const authorsRouter = require('./author.router');
const gendersRouter = require('./gender.router');
const authRouter = require('./auth.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/books', booksRouter);
    router.use('/authors', authorsRouter);
    router.use('/genders', gendersRouter);
}

module.exports = routerApi;