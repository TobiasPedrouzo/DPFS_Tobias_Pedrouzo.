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
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    location: (req, res) => {
        res.render('ubicacion');
    }
};

module.exports = mainController;