const {check} = require('express-validator');

let validateRegister = [
  check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('El email debe ser válido'),
  check('password').notEmpty().withMessage('Debes completar la contraseña').bail()
]

module.exports = validateRegister;