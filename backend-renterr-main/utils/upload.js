const multer = require("multer");
const crypto = require("crypto");

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log("====>>>", file);
    cb(
      null,
      "y" +
        new Date().toISOString().replace(/:/g, "-") +
        "-" +
        crypto.randomUUID() +
        file.originalname
    );
  },
});
// const storageFiles = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/files");
//   },
//   filename: function (req, file, cb) {
//     console.log("====>>>", file);
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") +
//         "-" +
//         crypto.randomUUID() +
//         file.originalname
//     );
//   },
// });

const fileFilter = function (req, file, cb) {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, JPEG,files are allowed."));
  }
};

const upload = multer({ storage: storageImages });

module.exports = { upload };
