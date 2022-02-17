const express = require("express");
const users = require("./controllers/user");
const app = express();
const port = 8080;
const userRoutes = require("./routes/user");

app.get("/", (req, res) => {
  //   res.send("* this is home route *");
  res.status(200).json("hello menahil :D");
});
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("server is runing on", port);
});
