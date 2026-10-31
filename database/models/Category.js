module.exports = (sequelize, DataTypes) => sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'categories' });
