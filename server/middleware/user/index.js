const { tokenVerifier } = require("../helpers/jwt");

const userAuthentication = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      req.UserData = decoded;
      next();
    } else {
      throw {
        status: 404,
        message: "Token not Found",
      };
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      ...err,
    });
  }
};
module.exports = { userAuthentication };
