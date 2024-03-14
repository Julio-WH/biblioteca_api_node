const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/generateToken')
const router = express.Router();

const {getUserSchema} = require('../schemas/user.schema')

const userService = new UserService();

router.post('/login',
    validatorHandler(getUserSchema, 'body'),
    async (req, res, next) => {
        const {username, password} = req.body
        try {
            const user = await userService.findOne(username);
            const checkPassword = await compare(password, user.password);
            const tokenSession = await tokenSign(user.dataValues);
            if(checkPassword){
                res.json({...user.dataValues,tokenSession});
            }
            else{
                res.status(409).json({'error':'Invalid password'});
            }
            
        } catch (error) {
            next(error);
        }
    }

)
router.post('/register')

module.exports = router;
