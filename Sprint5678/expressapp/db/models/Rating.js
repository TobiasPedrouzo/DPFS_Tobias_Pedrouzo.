module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    score: {
      type: DataTypes.TINYINT,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: DataTypes.TEXT,
  }, {
    tableName: "ratings",
    createdAt: "created_at",
    updatedAt: false,
  });

  Rating.associate = (db) => {
    Rating.belongsTo(db.Service, {
      foreignKey: "service_id",
      as: "service",
    });

    Rating.belongsTo(db.User, {
      foreignKey: "client_id",
      as: "client",
    });
  };

  return Rating;
};
