const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { NotFound } = require("http-errors");

const { User } = require("../models");
const { sendEmail } = require("../helpers");

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

  async verifyEmail(req, res) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw NotFound();
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verify success",
    });
  }

  async reVerifyEmail(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound(`user with email: '${email}' not found `);
    }

    const { verificationToken } = user;

    if (verificationToken === null) {
      throw new NotFound("Verification has already been passed");
    }

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a targe="_blank" href="http://localhost:8787/api/users/verify/${verificationToken}">Подтвердите email</a>`,
    };

    await sendEmail(mail);

    res.json({
      message: "Verification email sent",
    });
  }
}

module.exports = new Users();
