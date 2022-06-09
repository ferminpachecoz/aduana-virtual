const {check} = require('express-validator');

let validateRegister = [
  check('name').notEmpty().withMessage('Debes completar el nombre').bail().isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
  check('lastname').notEmpty().withMessage('Debes completar el apellido').bail().isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
  check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('El email debe ser válido'),
  check('password').notEmpty().withMessage('Debes completar la contraseña').bail().isLength({min:5, max:15}).withMessage('La contraseña debe tener mínimo 5 caracteres y máximo 10')
]

module.exports = validateRegister;