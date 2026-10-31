require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./database/models');

const port = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => console.log(`Nido Sur disponible en http://localhost:${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('No se pudo iniciar la aplicación:', error);
    process.exit(1);
  });
}

module.exports = { app, start };
