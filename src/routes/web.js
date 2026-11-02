const express = require('express');
const fs = require('fs');
const path = require('path');
const { Product, Category, User } = require('../../database/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: { model: Category, as: 'category' }, limit: 6, order: [['createdAt', 'DESC']] });
    res.render('home', { title: 'Diseño que habita', products });
  } catch (error) { next(error); }
});

router.get('/cart', (req, res) => res.render('cart', { title: 'Tu carrito' }));
router.get('/dashboard', (req, res) => {
  const dashboardRoot = path.join(__dirname, '../../dashboard/dist');
  const builtDashboard = path.join(dashboardRoot, 'index.html');

  // La versión compilada es la fuente principal; el HTML legado evita romper
  // la ruta cuando alguien ejecuta Express antes de correr dashboard:build.
  if (fs.existsSync(builtDashboard)) return res.sendFile(builtDashboard);
  return res.sendFile('dashboard.html', { root: path.join(__dirname, '../../public') });
});
router.get('/health', (req, res) => res.json({ ok: true, service: 'nido-sur' }));

module.exports = router;
