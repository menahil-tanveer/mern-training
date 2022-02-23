import express, { Request, Response } from "express";
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(multiParty());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("this is home route ^_^ ....");
});
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

app.listen(port, () => {
  console.log("Server is runing on::::", port);
});
