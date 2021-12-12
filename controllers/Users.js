const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models");

class Users {
  async getCurrent(req, res) {
    const { email, subscription } = req.user;

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  }

  async updateAvatar(req, res) {
    const { path: tmpUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;

    const image = await Jimp.read(tmpUpload);
    await image.resize(250, Jimp.AUTO);
    await image.writeAsync(tmpUpload);

    try {
      const resultUpload = path.resolve(`public/avatars/${imageName}`);
      await fs.rename(tmpUpload, resultUpload);
      const avatarURL = path.join("public", "avatars", imageName);
      await User.findByIdAndUpdate(req.user._id, { avatarURL });
      res.json({
        avatarURL,
      });
    } catch (error) {
      await fs.unlink(tempUpload);
      throw error;
    }
  }
}

module.exports = new Users();
