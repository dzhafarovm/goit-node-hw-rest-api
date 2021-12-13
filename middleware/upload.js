const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 4096,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
