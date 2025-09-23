const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');

const mainRoutes = require('./Sprint3/routes/mainRoutes');
app.use('/', mainRoutes); 

app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(path.join(__dirname, 'public/'))); 

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});