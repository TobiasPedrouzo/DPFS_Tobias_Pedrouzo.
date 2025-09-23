const mainController = {
    home: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    location: (req, res) => {
        res.render('location');
    },

    productList: (req, res) => {
        res.render('products/productList', { products }); 
    },
    productDetail: (req, res) => {
        const product = products.find(p => p.id == req.params.id);
        res.render('products/productDetail', { product });
    },
    productCreate: (req, res) => {
        res.render('products/product-create-form');
    },
    productStore: (req, res) => {
        const newProduct = {
            id: products[products.length - 1].id + 1, 
            ...req.body 
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },
    productEdit: (req, res) => {
        const productToEdit = products.find(p => p.id == req.params.id);
        res.render('products/product-edit-form', { productToEdit });
    },
    productUpdate: (req, res) => {
        const index = products.findIndex(p => p.id == req.params.id);
        products[index] = { ...products[index], ...req.body };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },
    productDelete: (req, res) => {
        const filteredProducts = products.filter(p => p.id != req.params.id);
        fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, ' '));
        res.redirect('/products');
    }
};

module.exports = mainController;