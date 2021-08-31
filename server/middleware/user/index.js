const { tokenVerifier } = require("../../helper/jwt");

const userAuthentication = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      if (decoded.type === "user") {
        req.userData = decoded;
        next();
      } else {
        throw {
          status: 403,
          message: "Not Authorized",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Token not found",
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
