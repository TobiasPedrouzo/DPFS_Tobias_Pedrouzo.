const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const webRoutes = require('./routes/web');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/api');
const { attachCurrentUser } = require('./middlewares/auth');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'nido-sur-local-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(attachCurrentUser);

app.use('/', webRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => res.status(404).render('error', {
  title: 'Página no encontrada',
  message: 'No encontramos lo que buscabas.'
}));

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).render('error', {
    title: 'Ocurrió un error',
    message: 'Estamos trabajando para resolverlo.'
  });
});

module.exports = app;
