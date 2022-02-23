const { EventEmitter } = require("nodemailer/lib/xoauth2");

class testEventEmitter extends EventEmitter {}

function testEvent(req, res) {
  const testEmitter = new testEventEmitter();

  let test = 0;
  testEmitter.on("event", () => {
    console.log("* Event listened *", ++test);
  });
  testEmitter.emit("event");
  res.send("* event *");
}
module.exports = {
  testEvent,
};
