const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');
const productsFile = path.join(__dirname, '../data/products.json');

function readJson(file) {
    if (!fs.existsSync(file)) return [];
    try { return JSON.parse(fs.readFileSync(file, 'utf-8') || '[]'); } catch { return []; }
}

function paginate(req, items) {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const offset = (page - 1) * limit;
    const results = items.slice(offset, offset + limit);
    const base = req.protocol + '://' + req.get('host') + req.baseUrl + req.path;
    const mk = p => `${base}?page=${p}&limit=${limit}`;
    return {
        count: items.length,
        previous: page > 1 ? mk(page - 1) : null,
        next: offset + limit < items.length ? mk(page + 1) : null,
        results
    };
}

module.exports = {
    // Users
    usersList: (req, res) => {
        const users = readJson(usersFile);
        const mapped = users.map(u => ({ id: u.id, name: u.name, email: u.email, detail: `${req.protocol}://${req.get('host')}/api/users/${u.id}` }));
        const p = paginate(req, mapped);
        return res.json({ count: p.count, previous: p.previous, next: p.next, users: p.results });
    },
    userDetail: (req, res) => {
        const users = readJson(usersFile);
        const user = users.find(u => String(u.id) === String(req.params.id));
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { password, ...safe } = user;
        return res.json({
            ...safe,
            avatarUrl: user.avatar && user.avatar.startsWith('/') ? `${req.protocol}://${req.get('host')}${user.avatar}` : user.avatar || null
        });
    },

    // Products
    productsList: (req, res) => {
        const products = readJson(productsFile);
        const countByCategory = products.reduce((acc, p) => {
            const cat = p.category || 'sin_categoria';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        const mapped = products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            categories: [p.category || 'sin_categoria'],
            detail: `${req.protocol}://${req.get('host')}/api/products/${p.id}`
        }));
        const p = paginate(req, mapped);
        return res.json({ count: p.count, previous: p.previous, next: p.next, countByCategory, products: p.results });
    },
    productDetail: (req, res) => {
        const products = readJson(productsFile);
        const product = products.find(p => String(p.id) === String(req.params.id));
        if (!product) return res.status(404).json({ error: 'Product not found' });
        return res.json({
            ...product,
            categories: [product.category || 'sin_categoria'],
            imageUrl: product.image ? `${req.protocol}://${req.get('host')}/images/products/${product.image}` : null
        });
    }
};

