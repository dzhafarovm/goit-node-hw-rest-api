const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "maksim8797@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const email = {
//   to: "telax83771@ritumusic.com",
//   from: "maksim8797@gmail.com",
//   subject: "Рассылка с сайта",
//   html: "<p>С сайта пришла новая заява</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((err) => console.log(err.message));
