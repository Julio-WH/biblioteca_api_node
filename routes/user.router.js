const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.handler')
const checkRoleAuth = require('../middlewares/roleAuth.hadler')
const validatorHandler = require('../middlewares/validator.handler');
const { decodeSign } = require('../helpers/generateToken')
const { encrypt } = require('../helpers/handleBcrypt');

const {createUserSchema, updateUserSchema} = require('../schemas/user.schema')

const UserService = require('../services/user.service');

const service = new UserService();

router.post('/create',
    validatorHandler(createUserSchema, 'body'),
    checkAuth,
    checkRoleAuth(['admin', 'librarian']),
    async (req, res, next) => {
        const body = req.body;
        console.log("body",body)
        try{
            data_user = decodeSign(req.headers.authorization.split(' ').pop());
            const passwordHash = await encrypt(body.password);
            body.password = passwordHash;

            if('role' in body && data_user.role == 'librarian' && body.role == "admin")
                return res.status(404).json({'error':'No pudes crear un usuario admin'});
            const user = await service.create(body);
            res.status(200).json(user);
        }catch (error) {
            next(error);
        }
    }
)

router.patch('/edit',
    validatorHandler(updateUserSchema, 'body'),
    checkAuth,
    async (req, res, next) => {
        const body = req.body
        try{
            data_user = decodeSign(req.headers.authorization.split(' ').pop());
            user_id = data_user._id // Se obtiene el id del usuario que esta haciendo la peticion
            console.log("body",body)
            if('password' in body){
                body.password = await encrypt(body.password)
            }

            if('role' in body && data_user.role !== 'admin')
                return res.status(404).json({'error':'No tienes permiso para editar el role'})
            const user = await service.update(user_id, body);
            res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;