const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const testRoutes = require("./routes/test");
const arithRoutes = require("./routes/generator/arithmetic");
const algRoutes = require("./routes/generator/algebra");

app.get("/", (req, res) => res.send("Hello World"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/test", testRoutes);
app.use("/gen/arith", arithRoutes);
app.use("/gen/alg", algRoutes);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app.listen(8000);