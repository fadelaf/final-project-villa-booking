const { Users, Villas, Villas_image } = require("../models");

const deleteAll = async () => {
  // await Users.destroy({ where: {} }).then(() => {
  //   console.log("all user has been deleted successfully");
  // });

  // await Villas.destroy({ where: {} }).then(() => {
  //   console.log("all product has been deleted successfully");
  // });

  // await Villas_image.destroy({ where: {} }).then(() => {
  //   console.log("all product images has been deleted successfully");
  // });

  await Cart.Destroy({ where: {} }).then(() => {
    console.log("all product images has been deleted successfully");
  });

  await Cart.LineItem({ where: {} }).then(() => {
    console.log("all product images has been deleted successfully");
  });

  await Cart.Orders({ where: {} }).then(() => {
    console.log("all product images has been deleted successfully");
  });

  process.exit();
};

deleteAll();
