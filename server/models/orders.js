"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Users);
      Orders.hasMany(models.LineItem);
    }
  }
  Orders.init(
    {
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      tax: DataTypes.NUMERIC,
      discount: DataTypes.NUMERIC,
      total_due: DataTypes.NUMERIC,
      total_days: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      payt_trx_number: DataTypes.TEXT,
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
