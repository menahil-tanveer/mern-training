const { EventEmitter } = require("nodemailer/lib/xoauth2");

class testEventEmitter extends EventEmitter {}

export function testEvent(req, res) {
  const testEmitter = new testEventEmitter();

  let test: number = 0;
  testEmitter.on("event", () => {
    console.log("* Event listened *", test++);
  });
  testEmitter.emit("event");
  res.send("* event *");
}
// module.exports = {
//   testEvent,
// };
