const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index); // Listado
router.get('/create', productsController.create); // Formulario de creación
router.get('/:id', productsController.detail); // Detalle
router.post('/', productsController.store); // Acción de creación
router.get('/:id/edit', productsController.edit); // Formulario de edición
router.put('/:id', productsController.update); // Acción de edición
router.delete('/:id', productsController.destroy); // Acción de borrado

module.exports = router;