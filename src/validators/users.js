const { body } = require('express-validator');
const { User } = require('../../database/models');

const registerRules = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.'),
  body('email').trim().isEmail().withMessage('Ingresá un email válido.').custom(async (value) => {
    if (await User.findOne({ where: { email: value } })) throw new Error('Ese email ya está registrado.');
    return true;
  }),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
];

const loginRules = [
  body('email').trim().isEmail().withMessage('Ingresá un email válido.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
];

module.exports = { registerRules, loginRules };
