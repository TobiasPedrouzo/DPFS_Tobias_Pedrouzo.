const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); 

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(methodOverride('_method')); 

app.set('views', path.join(__dirname, 'Sprint4/views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mainRoutes = require('./Sprint4/routes/mainRoutes');
const productsRoutes = require('./Sprint4/routes/productsRoutes');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);

app.listen(3000, () => {
    console.log('Servidor funcionando en el puerto 3000');
});
