module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    booking_date: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
      defaultValue: "pending",
    },
  }, {
    tableName: "bookings",
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  Booking.associate = (db) => {
    Booking.belongsTo(db.Service, {
      foreignKey: "service_id",
      as: "service",
    });

    Booking.belongsTo(db.User, {
      foreignKey: "client_id",
      as: "client",
    });
  };

  return Booking;
};
