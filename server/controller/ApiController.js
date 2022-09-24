const { genSaltSync } = require("bcrypt");
const { decrypter } = require("../helper/bcrypt");
const { encrypter } = require("../helper/bcrypt");
const { Op } = require("sequelize");
const {
  Users,
  Villas,
  Villas_images,
  Villas_comments,
  Cart,
  Orders,
  LineItem,
} = require("../models");
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
      const { email, password, type } = req.body;
      let user = await Users.findOne({
        where: {
          email,
          type,
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
      const file = req.file;
      let { name, email, password } = req.body;
      const salt = genSaltSync(10);
      let hashPassword = encrypter(password, salt);

      // console.log(userId);

      const user = await Users.findOne({
        where: {
          id: userId,
          type: type,
        },
      });
      await Users.update(
        {
          name,
          email,
          password: hashPassword,
          salt: salt,
          avatar: file ? file.filename : user.avatar,
        },
        {
          individualHooks: true,
          where: {
            id: userId,
            type: type,
          },
        }
      );

      let newUpdate = await Users.findOne({ where: { id: userId } });
      res.status(200).json({
        status: 200,
        msg: "Updated",
        newUpdate,
      });
    } catch (err) {
      res.json(err);
    }
  }
  static async getVilla(req, res) {
    try {
      let { page, name, price } = req.params;
      // let { name, type } = req.body;
      // console.log(name);
      if (!name) name = " ";
      if (!page) page = 1;

      let limit_price = price;
      const limit = 3;

      const totalProduct = await Villas.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: "%" + name + "%" } },
            { address: { [Op.iLike]: "%" + name + "%" } },
          ],
        },
      });

      // const totalProduct = await Villas.findAll({
      //   where: {
      //     title: { [Op.iLike]: "%" + name + "%" },
      //   },
      // });

      // console.log(totalProduct);

      const totalPage = Math.ceil(totalProduct.length / limit);
      const offset = (page - 1) * limit;

      let get = await Villas.findAll({
        limit,
        offset,
        include: [
          { model: Villas_images, where: { primary: true } },
          { model: Villas_comments },
        ],
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { title: { [Op.iLike]: "%" + name + "%" } },
                { address: { [Op.iLike]: "%" + name + "%" } },
              ],
            },
            { price: { [Op.between]: [100000, limit_price] } },
          ],
        },
      });

      // console.log(get);
      res.status(200).json({
        totalProduct,
        length: totalProduct.length,
        limit,
        totalPage,
        get,
        status: 200,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async getVillaDetail(req, res) {
    try {
      const id = +req.params.id;

      let getDetail = await Villas.findOne({
        where: { id: id },
        include: [
          { model: Users, attributes: ["name", "avatar"] },
          { model: Villas_images, attributes: ["filename", "primary"] },
          { model: Villas_comments, attributes: ["comments", "rating"] },
        ],
      });

      res.status(200).json(getDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addToCart(req, res) {
    try {
      const UserId = req.userData.id;
      const status = "open";
      // const id = +req.params;
      const { villaid } = req.body;

      let cart = await Cart.create({
        UserId,
        status,
      });

      let findCart = await Cart.findOne({
        order: [["createdAt", "DESC"]],
        limit: 1,
      });

      let line = await LineItem.create({
        status: "booking",
        CartId: cart.id,
        VillaId: villaid,
        OrderId: null,
        days: null,
      });

      let findLine = await LineItem.findOne({
        order: [["createdAt", "DESC"]],
        limit: 1,
      });

      res.status(200).json({
        findCart,
        findLine,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async showCart(req, res) {
    try {
      const UserId = req.userData.id;
      // console.log(UserId);

      let cartOnly = await Cart.findAll({
        where: { UserId },
      });

      let cartFull = await Cart.findAll({
        where: { UserId },
        include: [
          {
            model: LineItem,
            include: [
              {
                model: Villas,
                include: [
                  {
                    model: Villas_images,
                    where: {
                      primary: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      let cart = [];
      let line = [];
      let villa = [];

      cartOnly.forEach((item) => {
        cart.push(item);
      });

      cartFull.forEach((item) => {
        line.push(item.LineItems[0]);
      });

      line.forEach((item) => {
        villa.push(item.Villa);
      });

      res.status(200).json({
        cart,
        line,
        villa,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async deleteCart(req, res) {
    try {
      const UserId = req.userData.id;
      const cartId = +req.params.cartId;
      const findCart = await Cart.findOne({
        where: { id: cartId },
        include: LineItem,
      });
      let lineId = findCart.LineItems[0].id;

      let delLine = await LineItem.destroy({
        where: { CartId: cartId, id: lineId },
      });

      let delCart = await Cart.destroy({
        where: { UserId: UserId, id: cartId },
      });

      res.status(200).json({
        status: 200,
        msg: "delete success",
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async bookSummary(req, res) {
    try {
      const UserId = req.userData.id;
      const cartId = +req.params.cartId;

      let cart = await Cart.findOne({
        where: {
          id: cartId,
          UserId: UserId,
        },
        include: [{ model: LineItem, include: Villas }],
      });

      let villaid = cart.LineItems[0].VillaId;

      let villa = await Villas.findOne({
        where: { id: villaid },
      });

      res.json(villa);
    } catch (err) {
      res.json(err);
    }
  }

  static async addOrder(req, res) {
    try {
      const UserId = req.userData.id;
      const { days, start, end, address, notes, city, price, cartId } =
        req.body;

      // console.log(cartId);

      let status = "open";
      let discount = 0;
      let tax = 0.05;
      let description = notes;
      if (days > 2) {
        discount = 0.05;
      }

      let subtotal = days * price;
      let discountAmount = subtotal * discount;
      subtotal = subtotal - discountAmount;
      let taxAmount = tax * subtotal;
      let total_due = subtotal + taxAmount;

      let random_number = Math.floor(Math.random() * 100000) + 100;
      let payt_trx_number = `${random_number}`;
      // let trx_num = await Orders.findAll({ where: payt_trx_number });

      // // console.log(trx_num);

      // if (trx_num) {
      //   random_number = Math.floor(Math.random() * 100000) + 1;
      //   payt_trx_number = `${random_number}`;
      // }

      let order = await Orders.create({
        start,
        end,
        tax,
        discount,
        total_due,
        total_days: days,
        description,
        city,
        address,
        status,
        UserId,
        payt_trx_number,
      });

      let orderid = order.id;

      let line = await LineItem.findOne({ where: { CartId: cartId } });

      let updateLine = await LineItem.update(
        {
          status: "checkout",
          days: days,
          OrderId: orderid,
          CartId: cartId,
          VillaId: line.VillaId,
        },
        {
          where: { id: line.id },
        }
      );

      let updateCart = await Cart.update(
        { status: "closed" },
        { where: { id: cartId } }
      );

      res.status(200).json({
        status: 200,
        msg: "Update Success",
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async showList(req, res) {
    try {
      const UserId = req.userData.id;

      let order = await Orders.findAll({
        where: { UserId: UserId },
        include: [
          {
            model: LineItem,
            where: {
              [Op.or]: [{ status: "checkout" }, { status: "ordered" }],
            },
            include: [
              {
                model: Villas,
                include: [{ model: Villas_images, where: { primary: true } }],
              },
            ],
          },
        ],
      });

      let villa = [];

      order.forEach((item) => {
        villa.push(item.LineItems[0].Villa);
      });

      res.json({
        status: 200,
        order,
        villa,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async orderCancel(req, res) {
    try {
      const UserId = req.userData.id;
      const orderId = +req.params.orderId;

      let order = await Orders.update(
        { status: "cancelled" },
        {
          where: { id: orderId, UserId: UserId },
        }
      );

      let line = await LineItem.update(
        { status: "cancelled" },
        {
          where: { OrderId: orderId },
        }
      );

      res.status(200).json({
        msg: "Update Success",
        UserId,
        orderId,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async Payment(req, res) {
    try {
      const UserId = req.userData.id;
      const { payt_trx_number } = req.body;

      let findOrder = await Orders.findOne({
        where: { payt_trx_number },
      });

      let order_data = findOrder;

      if (order_data) {
        let order = await Orders.update(
          {
            status: "paid",
          },
          {
            where: { payt_trx_number, UserId: UserId },
          }
        );

        let OrderId = findOrder.id;

        console.log(OrderId);

        let line = await LineItem.update(
          {
            status: "ordered",
          },
          {
            where: { OrderId },
          }
        );

        res.status(200).json({
          status: 200,
          msg: "Payment Success",
        });
      } else {
        throw {
          status: 500,
        };
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async showOrderForReview(req, res) {
    try {
      const UserId = req.userData.id;
      const id = +req.params.orderId;

      let order = await Orders.findOne({
        where: { UserId: UserId, id, status: "paid" },
        include: [
          {
            model: LineItem,
            include: {
              model: Villas,
              include: { model: Villas_images, where: { primary: true } },
            },
          },
        ],
      });

      const line = order.LineItems[0];
      const villa = line.Villa;

      // order;

      res.json({
        status: 200,
        order,
        line,
        villa,
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

      console.log(comments);

      let userComment = await Villas_comments.create({
        UserId,
        VillaId,
        comments,
        rating,
      });
      res.status(200).json({
        status: 200,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ApiController;
