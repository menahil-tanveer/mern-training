const cron = require("node-cron");
const mailer = require("nodemailer");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "iamhamid28@gmail.com",
    pass: "XXXXXXXX",
  },
});

export const scheduleEmail = (req, res) => {
  /*
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second ( optional )
    */
  cron.schedule("*/2 * * * *", () => {
    transporter.sendMail({
      from: "<iamhamid28@gmail.com>",
      to: "<menahal.tanveer@invozone.com>",
      subject: "Scheduled Email",
      text: "bruh",
    });
  });
  res.status(200).send("* job started *");
};
/**
 *
 * @param {*} userData
 * @description This method is responsible for sending an email to indicate successful registration
 */
export const sendEmail = (userData) => {
  transporter
    .sendMail({
      from: "<iamhamid28@gmail.com>",
      to: "<menahal.tanveer@invozone.com>",
      subject: "Testing",
      text: "Congrats! you have successfully been enrolled in CUI Lahore campus in BCE department",
    })
    .then(() => {
      console.log("* Email Sent *");
    });
};

// module.exports = {
//   scheduleEmail,
//   sendEmail,
// };
