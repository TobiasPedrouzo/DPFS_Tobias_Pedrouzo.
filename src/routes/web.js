const express = require('express');
const { Product, Category, User } = require('../../database/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: { model: Category, as: 'category' }, limit: 6, order: [['createdAt', 'DESC']] });
    res.render('home', { title: 'Diseño que habita', products });
  } catch (error) { next(error); }
});

router.get('/cart', (req, res) => res.render('cart', { title: 'Tu carrito' }));
router.get('/dashboard', (req, res) => res.sendFile('dashboard.html', { root: require('path').join(__dirname, '../../public') }));
router.get('/health', (req, res) => res.json({ ok: true, service: 'nido-sur' }));

module.exports = router;
