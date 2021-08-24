"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Villas_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Villas_comments.belongsTo(models.Villas);
      Villas_comments.belongsTo(models.Users);
    }
  }
  Villas_comments.init(
    {
      comments: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      created_on: DataTypes.DATE,
      VillaId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(comment, options) {
          // let date = new Date();
          // let year = date.getFullYear();
          // let month = date.getMonth();
          // let day = date.getDate();

          let today = new Date();
          let date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          let time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          let dateTime = date + " " + time;
          comment.created_on = dateTime;
        },
      },
      sequelize,
      modelName: "Villas_comments",
    }
  );
  return Villas_comments;
};
