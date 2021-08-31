const { Users, Villas, Villas_images } = require("../models");
const bcrypt = require("bcrypt");
const fs = require("fs");

const createUsers = () => {
  const data = fs.readFileSync("./dummy/JSON/users.json");
  const users = JSON.parse(data);

  try {
    users.forEach(async (user) => {
      const { id, name, email, password, gender, birthdate, avatar, type } =
        user;
      const salt = bcrypt.genSaltSync(10);
      await Users.create({
        // id,
        name,
        email,
        password,
        salt,
        gender,
        birthdate,
        avatar,
        type,
      });
      console.log("dummy data for user has been created successfully!");
    });
  } catch (err) {
    console.log("something went wrong! can't create dummy data for user.");
  }
};

const createProducts = () => {
  const data = fs.readFileSync("./dummy/JSON/villa.json");
  const products = JSON.parse(data);

  let status = true;

  // console.log(price);

  // const stock = Math.floor(Math.random() * 56) + 1;
  // const price = Math.floor(Math.random() * 4999999) + 500000;
  // const rating = Math.floor(Math.random() * 5) + 1;
  // const views = Math.floor(Math.random() * 300) + 1;

  try {
    products.forEach(async (product) => {
      const {
        // id,
        title,
        description,
        address,
        type,
        bedrooms,
        bathrooms,
        floor,
        facility,
        price,
        UserId,
      } = product;

      let productAdded = await Villas.create({
        // id,
        UserId,
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

      await Villas_images.create({
        VillaId: productAdded.id,
        filename: "blank.png",
        filesize: "22kb",
        filetype: "png",
        primary: true,
      });
    });
  } catch (err) {
    status = false;
  }

  if (status) {
    console.log("dummy data for products has been created!");
  } else {
    console.log(
      "something went wrong! can't create dummy data for product & product_images."
    );
  }
};

createUsers();
createProducts();
