const { Unauthorized, Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../models");
const { sendEmail } = require("../helpers");

const { SECRET_KEY } = process.env;

class Auth {
  async signup(req, res) {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }

    const verificationToken = v4();

    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Подтверждение email",
      html: `<a targe="_blank" href="http://localhost:8787/api/users/verify/${verificationToken}">Подтвердите email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong or not verify");
    }

    if (!user.verify) {
      throw new Unauthorized("Email or password is wrong or not verify");
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong or not verify");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  }

  async logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  }
}

module.exports = new Auth();
