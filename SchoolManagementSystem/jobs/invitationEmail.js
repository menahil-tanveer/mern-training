const mailer = require("nodemailer");
const { password } = require("pg/lib/defaults");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "mail.art.explosion@gmail.com",
    pass: "Artbees55",
  },
});
/**
 *
 * @param {*} userData
 * @description This method is responsible for sending login credentials to registered users
 */
const sendEmail = (userData) => {
  let { userId, email, secondaryEmail, password } = userData;
  console.log(`userId:${userId},email:${email},password:${password}`);
  transporter
    .sendMail({
      from: "<mail.art.explosion@gmail.com>",
      to: `<menahal.tanveer@invozone.com>`,
      subject: "SFS Login Credentials",
      text: `Signin to your official school account using the following credentials.
        Student ID:${userId}
        Email:${email}
        Password:${password}
      `,
    })
    .then(() => {
      console.log("***** Email Sent *****");
    });
};

module.exports = {
  sendEmail,
};
