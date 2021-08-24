"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Villas_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Villas_images.belongsTo(models.Villas);
    }
  }
  Villas_images.init(
    {
      filename: DataTypes.STRING,
      filesize: DataTypes.STRING,
      filetype: DataTypes.STRING,
      primary: DataTypes.BOOLEAN,
      VillaId: DataTypes.INTEGER,
    },
    {
      // hooks: {
      //   beforeCreate(image, options) {
      //     // image.filename = "https://via.placeholder.com/150";
      //   },
      // },
      sequelize,
      modelName: "Villas_images",
    }
  );
  return Villas_images;
};
