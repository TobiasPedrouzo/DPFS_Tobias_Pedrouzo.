module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    tableName: "categories",
    timestamps: false,
  });

  Category.associate = (db) => {
    Category.hasMany(db.Service, {
      foreignKey: "category_id",
      as: "services",
    });
  };

  return Category;
};
