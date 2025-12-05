const { body } = require('express-validator');

exports.register = [
    body('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('Mínimo 2 caracteres'),
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
];

exports.login = [
    body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

