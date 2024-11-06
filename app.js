const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const siteController = require('./controller/siteController')

const app = express();

app.set("view engine", "ejs");

const dbURI =
  "mongodb+srv://dbUser:abc12345@cliniccluster.jlpr8.mongodb.net/ClinicDB?retryWrites=true&w=majority&appName=ClinicCluster";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/visit-done/:rfid/:time", (req, res) => {
  res.render("visit-done");
});

app.post("/visit-done/:rfid/:time", siteController.visit_done_post);

app.get("/profile/:rfid", siteController.profile);
