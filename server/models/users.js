"use strict";
const { Model } = require("sequelize");
const { encrypter } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Villas);
      Users.hasMany(models.Villas_comments);
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null",
          },
          notEmpty: "Name cannot be empty",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already in use" },
        validate: {
          notNull: {
            msg: "Email cannot be null",
          },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Only email format is allowed" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      salt: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "Birthdate cannot be empty!",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "gender cannot be null" },
          notEmpty: { msg: "gender cannot be empty" },
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "gender cannot be null" },
          notEmpty: { msg: "gender cannot be empty" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user, options) {
          user.password = encrypter(user.password, user.salt);

          if (user.type === "admin") {
            user.type = "admin";
          } else {
            user.type = "user";
          }
        },
        // beforeUpdate(user, options) {
        //   user.password = encrypter(user.password, user.salt);
        // },
      },
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
