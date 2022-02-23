// const bodyParser = require("body-parser");
const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const app = express();
const port = 8081;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// app.use(multiParty());
app.get("/", (req, res) => {
    //   res.send("<h1 style='color:blue'> This is home route </h1>");
    res.status(200).json("this is home route ^_^ ");
});
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.listen(port, () => {
    console.log("Server is runing on::::", port);
});
//# sourceMappingURL=app.js.map