"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Villas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Villas.belongsTo(models.Users);
      Villas.hasMany(models.Villas_images);
    }
  }
  Villas.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title or villa's name cannot be nulls" },
          notEmpty: { msg: "title or villa's name cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 101],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "address cannot be null" },
          notEmpty: { msg: "address cannot be empty" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "type cannot be null" },
          notEmpty: { msg: "type cannot be empty" },
        },
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "bedrooms cannot be null" },
          isInt: { msg: "bedrooms must be an integer" },
          min: 1,
        },
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "bathrooms cannot be null" },
          isInt: { msg: "bathrooms must be an integer" },
          min: 1,
        },
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "floor cannot be null" },
          isInt: { msg: "floor must be an integer" },
          min: 1,
        },
      },

      facility: {
        type: DataTypes.STRING,
      },

      price: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          notNull: { msg: "price cannot be null" },
          isNumeric: { msg: "price must be a number" },
        },
      },

      UsersId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        beforeCreate(villa, options) {
          villa.bedrooms = 1;
          villa.bathrooms = 1;
          villa.floor = 1;
          villa.type = "Standard";
        },
      },
      sequelize,
      modelName: "Villas",
    }
  );
  return Villas;
};
