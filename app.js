const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require('./models/campground');

mongoose.connect("mongodb://localhost:27017/help-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("dataase connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({title: 'my house', description: 'mafo'});
    await camp.save();
    res.send(camp)
  });


app.listen(3000, () => {
  console.log("Server is running");
});
