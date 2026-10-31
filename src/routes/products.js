const express = require('express');
const { validationResult } = require('express-validator');
const { Product, Category } = require('../../database/models');
const { productRules } = require('../validators/products');
const router = express.Router();

const formData = (body) => ({
  name: body.name,
  description: body.description,
  image: body.image,
  price: Number(body.price),
  category: body.category,
  categoryId: body.categoryId || null,
  colors: body.colors ? String(body.colors).split(',').map((item) => item.trim()).filter(Boolean) : [],
  sizes: body.sizes ? String(body.sizes).split(',').map((item) => item.trim()).filter(Boolean) : [],
  stock: Number(body.stock || 0)
});

async function categories() { return Category.findAll({ order: [['name', 'ASC']] }); }

router.get('/', async (req, res, next) => {
  try {
    const where = req.query.q ? { name: { [require('sequelize').Op.like]: `%${req.query.q}%` } } : undefined;
    const products = await Product.findAll({ where, include: { model: Category, as: 'category' }, order: [['createdAt', 'DESC']] });
    res.render('products/index', { title: 'Colección', products, query: req.query.q || '' });
  } catch (error) { next(error); }
});

router.get('/create', async (req, res, next) => {
  try { res.render('products/form', { title: 'Nuevo producto', product: {}, categories: await categories(), errors: [] }); } catch (error) { next(error); }
});

router.post('/', productRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).render('products/form', { title: 'Nuevo producto', product: req.body, categories: await categories(), errors: errors.array() });
  try {
    const data = formData(req.body);
    const category = await Category.findOne({ where: { name: data.category } });
    data.categoryId = category?.id || (await Category.create({ name: data.category, slug: data.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') })).id;
    await Product.create(data);
    res.redirect('/products');
  } catch (error) { next(error); }
});

router.get('/:id/edit', async (req, res, next) => {
  try { res.render('products/form', { title: 'Editar producto', product: await Product.findByPk(req.params.id, { include: { model: Category, as: 'category' } }), categories: await categories(), errors: [] }); } catch (error) { next(error); }
});

router.put('/:id', productRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).render('products/form', { title: 'Editar producto', product: { ...req.body, id: req.params.id }, categories: await categories(), errors: errors.array() });
  try { await Product.update(formData(req.body), { where: { id: req.params.id } }); res.redirect(`/products/${req.params.id}`); } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try { await Product.destroy({ where: { id: req.params.id } }); res.redirect('/products'); } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: { model: Category, as: 'category' } });
    if (!product) return res.status(404).render('error', { title: 'Producto no encontrado', message: 'Este producto ya no está disponible.' });
    res.render('products/detail', { title: product.name, product });
  } catch (error) { next(error); }
});

module.exports = router;
