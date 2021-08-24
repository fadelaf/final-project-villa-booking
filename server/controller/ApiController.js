const { genSaltSync } = require("bcrypt");
const { decrypter } = require("../helper/bcrypt");
const { Users, Villas, Villas_comments } = require("../models");
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

  static async updateProfile(req, res) {
    try {
      const userId = req.userData.id;
      const type = req.userData.type;
      const file = req.files;
      let { name, email, password } = req.body;
      const salt = genSaltSync(10);
      // console.log(password);
      // console.log(password);
      let hashPassword = encrypter(password, salt);
      // console.log(x);
      // console.log(userId);
      await Users.update(
        {
          name,
          email,
          password: hashPassword,
          avatar: file ? file.name : "https://via.placeholder.com/150",
        },
        {
          where: {
            id: userId,
            type: type,
          },
        }
      );
      // console.log(updateAdmin);
      res.status(200).json({
        status: 200,
        msg: "Updated",
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async addComment(req, res) {
    try {
      const UserId = req.userData.id;
      const VillaId = +req.params.id;
      const { comments, rating } = req.body;
      let userComment = await Villas_comments.create({
        UserId,
        VillaId,
        comments,
        rating,
      });
      res.status(200).json({
        status: 200,
        userComment,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ApiController;
