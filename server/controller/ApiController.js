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
      const emailDuplicate = await Users.findOne({
        where: { email: email },
      });

      if (emailDuplicate) {
        res.status(409).json({
          msg: "email already exist",
        });
      } else {
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
          status: 201,
          message: "Account Added",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user) {
        let userPassword = user.password;
        let isMatch = decrypter(password, userPassword);
        if (isMatch) {
          // console.log(user);
          const access_token = tokenGenerator(user.dataValues);
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
