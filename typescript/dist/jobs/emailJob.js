"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.scheduleEmail = void 0;
const cron = require("node-cron");
const mailer = require("nodemailer");
const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "iamhamid28@gmail.com",
        pass: "XXXXXXXX",
    },
});
const scheduleEmail = (req, res) => {
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
exports.scheduleEmail = scheduleEmail;
/**
 *
 * @param {*} userData
 * @description This method is responsible for sending an email to indicate successful registration
 */
const sendEmail = (userData) => {
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
exports.sendEmail = sendEmail;
// module.exports = {
//   scheduleEmail,
//   sendEmail,
// };
//# sourceMappingURL=emailJob.js.map