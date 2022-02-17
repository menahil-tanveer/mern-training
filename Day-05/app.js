const bodyParser = require("body-parser");
const express = require("express");
const users = require("./controllers/user");
const multiParty = require("connect-multiparty");
const userRoutes = require("./routes/user");

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(multiParty());

app.get("/", (req, res) => {
  //   res.send("* this is home route *");
  res.status(200).json("this is home route *_*");
});
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("server is runing on", port);
});
