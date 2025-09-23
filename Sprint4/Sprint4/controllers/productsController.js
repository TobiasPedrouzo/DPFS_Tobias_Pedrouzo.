const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('products', { products });
	},

	detail: (req, res) => {
		const product = products.find(p => p.id == req.params.id);
		res.render('productDetail', { product });
	},

	create: (req, res) => {
		res.render('product-create-form');
	},
	store: (req, res) => {
		const newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: 'default-image.png' 
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
	},

	edit: (req, res) => {
		const productToEdit = products.find(p => p.id == req.params.id);
		res.render('product-edit-form', { productToEdit });
	},

	update: (req, res) => {
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