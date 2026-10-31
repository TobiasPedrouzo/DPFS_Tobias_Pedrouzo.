const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || path.join(__dirname, '..', 'nido-sur.sqlite'),
    logging: false
  },
  test: { dialect: 'sqlite', storage: ':memory:', logging: false },
  production: { dialect: 'sqlite', storage: process.env.DB_STORAGE || path.join(__dirname, '..', 'nido-sur.sqlite'), logging: false }
};
