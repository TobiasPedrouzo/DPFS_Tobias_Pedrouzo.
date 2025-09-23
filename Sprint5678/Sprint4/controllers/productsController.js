const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const controller = {
	index: (req, res) => {
		const { category, q } = req.query;
		let filtered = products;
		if (category) {
			filtered = filtered.filter(p => (p.category || '').toLowerCase() === String(category).toLowerCase());
		}
		if (q) {
			const term = String(q).toLowerCase();
			filtered = filtered.filter(p => (p.name || '').toLowerCase().includes(term) || (p.description || '').toLowerCase().includes(term));
		}
		res.render('products/productList', { products: filtered, category: category || '', q: q || '' });
	},

		detail: (req, res) => {
		const product = products.find(p => p.id == req.params.id);
			res.render('products/productDetail', { product });
	},

		create: (req, res) => {
			res.render('products/product-create-form');
		},
		store: (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).render('products/product-create-form', { error: errors.array()[0].msg });
			}
		const newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: 'default-image.png' 
				,createdAt: new Date().toISOString()
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
	},

		edit: (req, res) => {
		const productToEdit = products.find(p => p.id == req.params.id);
			res.render('products/product-edit-form', { productToEdit });
	},

		update: (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const productToEdit = products.find(p => p.id == req.params.id);
				return res.status(400).render('products/product-edit-form', { error: errors.array()[0].msg, productToEdit });
			}
		const index = products.findIndex(p => p.id == req.params.id);
		products[index] = { id: parseInt(req.params.id), ...req.body, image: products[index].image };
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
	},

	destroy : (req, res) => {
		const filteredProducts = products.filter(p => p.id != req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, ' '));
		res.redirect('/products');
	}
};

module.exports = controller;