const bcrypt = require('bcryptjs');
const { sequelize, User, Product, Category } = require('./models');
const products = require('../data/products.json');
const users = require('../data/users.json');

async function seed() {
  await sequelize.sync({ force: true });
  const categories = [...new Set(products.map((product) => product.category))];
  const categoryRows = {};
  for (const name of categories) {
    const row = await Category.create({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
    categoryRows[name] = row;
  }
  for (const product of products) {
    await Product.create({ ...product, categoryId: categoryRows[product.category].id });
  }
  for (const user of users) {
    await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
  }
  console.log('Base de datos inicializada con datos de ejemplo.');
}

seed().catch((error) => { console.error(error); process.exit(1); }).finally(() => sequelize.close());
