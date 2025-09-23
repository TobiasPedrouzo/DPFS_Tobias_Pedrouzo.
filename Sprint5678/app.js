const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberMiddleware = require('./Sprint4/middlewares/rememberMiddleware');
const cors = require('cors');

app.use(express.static('public')); 
app.use('/Styles', express.static(path.join(__dirname, 'Sprint4/Styles')));
app.use('/styles', express.static(path.join(__dirname, 'Sprint4/Styles')));
app.use('/js', express.static(path.join(__dirname, 'Sprint4/public/js')));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(methodOverride('_method')); 
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Middleware to expose logged user to all views
app.use((req, res, next) => {
    res.locals.userLogged = req.session && req.session.userLogged ? req.session.userLogged : null;
    next();
});
app.use(rememberMiddleware);

app.set('views', path.join(__dirname, 'Sprint4/views'));
app.set('view engine', 'ejs');
console.log('Views directory set to:', app.get('views'));

const mainRoutes = require('./Sprint4/routes/mainRoutes');
const productsRoutes = require('./Sprint4/routes/productsRoutes');
const usersRoutes = require('./Sprint4/routes/usersRoutes');
const configRoutes = require('./Sprint4/routes/configRoutes');
const apiRoutes = require('./Sprint4/routes/apiRoutes');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/config', configRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});
