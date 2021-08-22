const jwt = require("jsonwebtoken");
const secretCode = "secret";

const tokenGenerator = (user) => {
  const { id, name, email, avatar, type } = user;
  let token = jwt.sign(
    {
      id,
      name,
      email,
      avatar,
      type,
    },
    secretCode
  );
  return token;
};

const tokenVerifier = (token) => {
  let decoded = jwt.verify(token, secretCode);
  return decoded;
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
