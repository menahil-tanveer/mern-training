"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const app = (0, express_1.default)();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// app.use(multiParty());
app.get("/", (req, res) => {
    res.status(200).json("this is home route ^_^ ....");
});
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.listen(port, () => {
    console.log("Server is runing on::::", port);
});
//# sourceMappingURL=app.js.map