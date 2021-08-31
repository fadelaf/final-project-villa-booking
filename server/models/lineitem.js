"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LineItem.belongsTo(models.Cart);
      LineItem.belongsTo(models.Villas);
      LineItem.belongsTo(models.Orders);
    }
  }
  LineItem.init(
    {
      days: DataTypes.INTEGER,
      status: DataTypes.STRING,
      CartId: DataTypes.INTEGER,
      VillaId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LineItem",
    }
  );
  return LineItem;
};
