const { body } = require('express-validator');

exports.create = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria').isLength({ min: 10 }).withMessage('Mínimo 10 caracteres'),
    body('category').notEmpty().withMessage('La categoría es obligatoria'),
    body('price').notEmpty().withMessage('El precio es obligatorio').isFloat({ min: 0 }).withMessage('Precio inválido')
];

exports.update = [
    body('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('description').optional().notEmpty().withMessage('La descripción es obligatoria').isLength({ min: 10 }).withMessage('Mínimo 10 caracteres'),
    body('category').optional().notEmpty().withMessage('La categoría es obligatoria'),
    body('price').optional().notEmpty().withMessage('El precio es obligatorio').isFloat({ min: 0 }).withMessage('Precio inválido')
];

