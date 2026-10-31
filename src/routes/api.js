const express = require('express');
const { Op } = require('sequelize');
const { User, Product, Category } = require('../../database/models');
const router = express.Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'createdAt'], order: [['createdAt', 'DESC']] });
    res.json({ count: users.length, users: users.map((user) => ({ id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, image: user.image || null, detail: `/api/users/${user.id}` })) });
  } catch (error) { next(error); }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password', 'category'] } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) { next(error); }
});

router.get('/products', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1); const limit = Math.min(Number(req.query.limit || 10), 50);
    const { rows, count } = await Product.findAndCountAll({ include: { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }, limit, offset: (page - 1) * limit, order: [['createdAt', 'DESC']] });
    const all = await Product.findAll({ attributes: ['id', 'categoryId'], include: { model: Category, as: 'category', attributes: ['name'] } });
    const countByCategory = all.reduce((acc, item) => { const key = item.category?.name || 'Sin categoría'; acc[key] = (acc[key] || 0) + 1; return acc; }, {});
    res.json({ count, page, pages: Math.ceil(count / limit), countByCategory, products: rows.map((product) => ({ id: product.id, name: product.name, description: product.description, image: product.image, category: product.category ? [product.category] : [], price: product.price, detail: `/api/products/${product.id}` })) });
  } catch (error) { next(error); }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] } });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ ...product.toJSON(), category: product.category ? [product.category] : [], image: product.image });
  } catch (error) { next(error); }
});

module.exports = router;
