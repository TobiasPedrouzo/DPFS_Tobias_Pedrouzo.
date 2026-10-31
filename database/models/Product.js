module.exports = (sequelize, DataTypes) => sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  colors: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  sizes: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 }
}, { tableName: 'products' });
