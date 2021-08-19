const bcrypt = require("bcrypt");

const encrypter = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

const decrypter = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = { encrypter, decrypter };
