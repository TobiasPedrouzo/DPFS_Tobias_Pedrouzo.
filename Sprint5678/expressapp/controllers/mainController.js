const db = require('../db/models');

const mainController = {
    home: async (req, res) => {
        const categories = await db.Category.findAll();
        console.log(categories);
        res.render('index');
    },
    login: (req, res) => {
        res.redirect('/users/login');
    },
    register: (req, res) => {
        res.redirect('/users/register');
    },
    location: (req, res) => {
        res.render('ubicacion', { location: req.session.userLocation || '' });
    },
    saveLocation: (req, res) => {
        const { location } = req.body;
        req.session.userLocation = location || '';
        return res.redirect('/');
    },
    hire: (req, res) => {
        const { category, q } = req.query;
        const target = '/products' + (category || q ? `?${[category?`category=${encodeURIComponent(category)}`:'', q?`q=${encodeURIComponent(q)}`:''].filter(Boolean).join('&')}` : '');
        if (!req.session || !req.session.userLogged) {
            return res.redirect(`/users/login?redirect=${encodeURIComponent(target)}`);
        }
        return res.redirect(target);
    },
};

module.exports = mainController;