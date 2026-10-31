const { body } = require('express-validator');

const productRules = [
  body('name').trim().isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),
  body('description').trim().isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
  body('image').trim().isURL().withMessage('La imagen debe ser una URL válida.'),
  body('category').trim().notEmpty().withMessage('Elegí una categoría.'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser positivo.')
];

module.exports = { productRules };
