const { NotFound } = require("http-errors");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const reVerifyEmail = async (req, res) => {
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
};

module.exports = reVerifyEmail;
