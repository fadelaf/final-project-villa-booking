const multer = require("multer");
const { tokenVerifier } = require("../helper/jwt");

const singlePhoto = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/avatar");
    },
    filename: function (req, file, cb) {
      const { access_token } = req.headers;
      let name;

      if (access_token) {
        const decoded = tokenVerifier(access_token);
        name = decoded.name.split(" ");
        name = name[0];
      } else {
        name = "user";
        // console.log(req.body.name);
        // name = req.body.name;
        // name = name.split(" ");
      }

      cb(null, name.toLowerCase() + "-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
  });

  return upload.single("file");
};

const multiplePhotos = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/villas");
    },
    filename: function (req, file, cb) {
      const { access_token } = req.headers;
      const decoded = tokenVerifier(access_token);
      const name = decoded.name.split(" ");

      // file.status = true;

      const mimetype = file.mimetype.split("/");

      // cb(null, Date.now() + "-" + file.originalname);
      cb(null, name[0].toLowerCase() + "-" + Date.now() + "." + mimetype[1]);
    },
  });

  const upload = multer({
    storage: storage,
  });

  return upload.array("file", 10);
};

module.exports = {
  singlePhoto,
  multiplePhotos,
};
