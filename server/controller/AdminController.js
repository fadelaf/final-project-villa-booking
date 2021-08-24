const { Users, Villas, Villas_images } = require("../models");
const { encrypter } = require("../helper/bcrypt");
const { genSaltSync } = require("bcrypt");

class AdminController {
  static async myVilla(req, res) {
    try {
      const adminId = req.userData.id;
      let villa = await Villas.findAll({
        where: {
          UserId: adminId,
        },
        include: Villas_images,
      });

      res.status(200).json({
        status: 200,
        villa,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async villaDetail(req, res) {
    try {
      const adminId = req.userData.id;
      const id = +req.params.id;

      let detailVilla = await Villas.findOne({
        where: { UserId: adminId, id: id },
      });
      res.status(200).json({ status: 200, detailVilla });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addVillas(req, res) {
    try {
      const file = req.files;
      const adminId = req.userData.id;
      const {
        title,
        description,
        address,
        type,
        facility,
        bedrooms,
        bathrooms,
        floor,
        price,
      } = req.body;
      // console.log(file.length);
      // console.log(adminId);
      // console.log(bedrooms);

      let newVilla = await Villas.create({
        title,
        description,
        address,
        type,
        bedrooms,
        bathrooms,
        floor,
        facility,
        price,
        UserId: adminId,
      });

      for (let i = 0; i < file.length; i++) {
        const filename = file[i]
          ? file[i].filename
          : "https://via.placeholder.com/150";
        const filesize = file[i] ? file[i].size : "22kb";
        const filetype = file[i] ? file[i].mimetype : ".png";
        const primary = i === 0 ? true : false;
        // console.log(filename);

        await Villas_images.create({
          VillaId: newVilla.id,
          filename,
          filesize,
          filetype,
          primary,
        });
      }

      let newVillaData = await Villas.findAll({
        where: { id: newVilla.id },
        include: Villas_images,
      });

      res.json({
        status: 200,
        newVillaData,
      });
    } catch (err) {
      res.json({
        status: 500,
        ...err,
      });
    }

    // .then((product) => {
    //   for (let i = 0; i < 10; i++) {
    //     const fileName = files[i]
    //       ? files[i].filename
    //       : "https://via.placeholder.com/150";
    //     const fileSize = files[i] ? files[i].size : "22kb";
    //     const fileType = files[i] ? files[i].mimetype : ".png";
    //     const primary = i === 0 ? true : false;

    //     Villas_images.create({
    //       ProductId: product.id,
    //       fileName,
    //       fileSize,
    //       fileType,
    //       primary,
    //     });
    //   }
    //   res.status(201).json({
    //     status: 201,
    //     message: "New Villa is added",
    //     product,
    //   });
    // })
    // .catch((err) => {
    //   res.status(500).json({
    //     status: 500,
    //     msg: "error",
    //     ...err,
    //   });
    // });
  }

  static photo(req, res) {
    const file = req.file;
    res.json(file);
    // console.log(file);
  }

  static async updateVilla(req, res) {
    const adminId = req.userData.id;
    const { id } = +req.params.id;
    const {
      title,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      floor,
      facility,
      price,
    } = req.body;
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
          individualHooks: true,
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

  static async villaComment(req, res) {
    try {
      const adminId = req.userData.id;
      const id = +req.params.id;

      let comment = Villas_comments.findAll({
        where: { userId: adminId, VillaId: id },
      });
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = AdminController;
