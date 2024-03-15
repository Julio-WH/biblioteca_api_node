const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.handler')
const validatorHandler = require('../middlewares/validator.handler');
const { decodeSign } = require('../helpers/generateToken')
const { encrypt } = require('../helpers/handleBcrypt');

const {updateUserSchema} = require('../schemas/user.schema')

const UserService = require('../services/user.service');

const service = new UserService();

router.patch('/edit',
    validatorHandler(updateUserSchema, 'body'),
    checkAuth,
    async (req, res, next) => {
        const body = req.body
        try{
            data_user = decodeSign(req.headers.authorization.split(' ').pop());
            user_id = data_user._id // Se obtiene el id del usuario
            body.password = await encrypt(body.password)
            const user = await service.update(user_id, body);
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;