const bodyParser = require("body-parser");
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const port = 8082;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.status(200).json("Home route *_* ");
});
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/courses", courseRoutes);
app.listen(port, () => {
  console.log("Server is running on::::", port);
});
