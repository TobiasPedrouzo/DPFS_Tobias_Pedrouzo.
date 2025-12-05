module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("client", "worker", "admin"),
      defaultValue: "client",
    },
  }, {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  User.associate = (db) => {
    // User (worker) → Services
    User.hasMany(db.Service, {
      foreignKey: "worker_id",
      as: "services",
    });

    // User (client) → Ratings
    User.hasMany(db.Rating, {
      foreignKey: "client_id",
      as: "client_ratings",
    });

    // User (client) → Bookings
    User.hasMany(db.Booking, {
      foreignKey: "client_id",
      as: "client_bookings",
    });
  };

  return User;
};
