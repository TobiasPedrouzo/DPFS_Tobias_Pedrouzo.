module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    worker_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    tableName: "services",
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  Service.associate = (db) => {
    // Service → Worker (User)
    Service.belongsTo(db.User, {
      foreignKey: "worker_id",
      as: "worker",
    });

    // Service → Category
    Service.belongsTo(db.Category, {
      foreignKey: "category_id",
      as: "category",
    });

    // Service → Ratings
    Service.hasMany(db.Rating, {
      foreignKey: "service_id",
      as: "ratings",
    });

    // Service → Bookings
    Service.hasMany(db.Booking, {
      foreignKey: "service_id",
      as: "bookings",
    });
  };

  return Service;
};
