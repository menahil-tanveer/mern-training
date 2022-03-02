const bodyParser = require("body-parser");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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
// SWAGGER DOCS
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management System",
      version: "1.0.0",
      description: "School ",
    },
    servers: [
      {
        url: "http://localhost:8082",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log("Server is running on::::", port);
});
