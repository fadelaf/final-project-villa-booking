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
        include: {
          model: Villas_images,
          where: {
            primary: true,
          },
        },
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
        include: Villas_images,
      });
      res.status(200).json({ status: 200, detailVilla });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addVillas(req, res) {
    try {
      const files = req.files;
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
      console.log(files);

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
      console.log(files.length);
      if (files.length == 0) {
        const filename = "https://via.placeholder.com/150";
        const filesize = "22kb";
        const filetype = ".jpeg";
        const primary = true;

        await Villas_images.create({
          VillaId: newVilla.id,
          filename,
          filesize,
          filetype,
          primary,
        });
      } else {
        for (let i = 0; i < files.length; i++) {
          const filename = files[i]
            ? files[i].filename
            : "https://via.placeholder.com/150";
          const filesize = files[i] ? files[i].size : "22kb";
          const filetype = files[i] ? files[i].mimetype.split("/")[1] : ".png";
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
    try {
      const adminId = req.userData.id;
      const id = +req.params.id;
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
      // console.log(description);
      let update = await Villas.update(
        {
          title,
          description,
          address,
          type,
          bedrooms,
          bathrooms,
          floor,
          facility,
          price,
        },
        {
          where: { UserId: adminId, id: id },
        }
      );

      let newUpdate = await Villas.findOne({
        where: { UserId: adminId, id: id },
      });

      res.status(200).json({
        status: 200,
        newUpdate,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteVilla(req, res) {
    // let admin = await Villas.findOne({
    //   where: { id: adminId },
    // });

    try {
      const adminId = req.userData.id;
      const { id } = req.body;

      let villa = await Villas.findOne({
        where: { id },
      });

      await Villas.destroy({
        where: { id: villa.id, UserId: adminId },
      });

      await Villas_images.destroy({
        where: { VillaId: villa.id },
      });

      await Villas_comments.destroy({
        where: { VillaId: villa.id },
      });

      res.json({
        msg: "Villa is deleted",
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.userData.id;
      const type = req.userData.type;
      const file = req.file;
      let { name, email, password } = req.body;
      const salt = genSaltSync(10);
      // console.log(password);
      // console.log(password);
      let hashPassword = encrypter(password, salt);
      // console.log(x);
      // console.log(userId);

      // console.log(file);

      const admin = await Users.findOne({
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
          avatar: file ? file.filename : admin.avatar,
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
