const jwt = require("jsonwebtoken");
const secretCode = "secret";

const tokenGenerator = (user) => {
  const { id, username, email, image, type } = user;
  let token = jwt.sign(
    {
      id,
      username,
      email,
      image,
      type,
    },
    secretCode
  );
};

const tokenVerifier = (token) => {
  let decoded = jwt.verify(token, secretCode);
  return decoded;
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
