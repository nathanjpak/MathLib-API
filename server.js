const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const testRoutes = require("./routes/test");
const arithRoutes = require("./routes/generator/arithmetic");
const algRoutes = require("./routes/generator/algebra");

app.get("/", (req, res) => res.send("Hello World!"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use("/test", testRoutes);
app.use("/gen/arith", arithRoutes);
app.use("/gen/alg", algRoutes);

module.exports = app.listen(8000);