const { Unauthorized, Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

class Auth {
  async signin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);

    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
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

  async signup(req, res) {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({
      email,
      password: hashPassword,
      subscription,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
        },
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
