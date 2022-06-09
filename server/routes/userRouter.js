let express = require('express');
let router = express.Router();
const validateRegister = require('../middlewares/registerValidation');
const validateLogin = require('../middlewares/loginValidation');

let userController = require('../controllers/userController');

router.post('/register', validateRegister, userController.processRegister);
router.post('/login', validateLogin, userController.processLogin)
router.get('/session', userController.sendSession)

module.exports = router;