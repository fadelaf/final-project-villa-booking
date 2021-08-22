const { Users, Villas } = require("../models");

class AdminController {
  static async addVillas(req, res) {
    const file = req.files;
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
    const adminId = req.userData.id;
    // let adminId = await Users.findOne({
    //   where: { id },
    // });

    let newVilla = Villas.create({
      title,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      floor,
      facility,
      price,
    });

    res.status(200).json(adminId);
  }

  static photo(req, res) {
    const file = req.file;
    res.json(file);
    console.log(file);
  }

  static async Profile(req, res) {}
}

module.exports = AdminController;
