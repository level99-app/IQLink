const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(`${__dirname}/client/build`));
// importing routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const educationRoutes = require("./routes/educations");
const experienceRoutes = require("./routes/experiences");
app.use(cors(corsOptions));
app.use(bodyParser.json());

// connecting to Database

let dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.ATLAS_URI
    : "mongodb://127.0.0.1:27017/iqlink";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("build"));
}

app.get("*", (req, res) => {

  let path = req.params['0'].substring(1)

    // Return the actual file
    res.sendFile(`${__dirname}/build/${path}`);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
