const { genSaltSync } = require("bcrypt");
const { decrypter } = require("../helper/bcrypt");
const { Users } = require("../models");
const { tokenGenerator, tokenVerifier } = require("../helper/jwt");

class ApiController {
  static async register(req, res) {
    const file = req.file;
    const { name, email, password, birthdate, gender, type } = req.body;
    const salt = genSaltSync(10);

    try {
      await Users.create({
        name,
        email,
        password,
        salt,
        birthdate,
        gender,
        avatar: file ? file.name : "https://via.placeholder.com/150",
        type,
      });
      res.status(201).json({
        message: "Account Added",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        let userPassword = user.password;
        let isMatch = decrypter(password, userPassword);
        if (isMatch) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            status: 200,
            message: "Login Successful",
            user,
            access_token,
          });
        } else {
          throw {
            status: 403,
            message: "Invalid Password",
          };
        }
      } else {
        throw {
          status: 404,
          message: "User not found",
        };
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ApiController;
