const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");

const dbURI = "mongodb+srv://dbUser:abc12345@cliniccluster.jlpr8.mongodb.net/ClinicDB?retryWrites=true&w=majority&appName=ClinicCluster";
mongoose    
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    User.find()
        .sort({ createdAt: -1 })
        .then((result) => {
        console.log(result);
        res.render("index", {users: result });
        })
        .catch((err) => {
        console.log(err);
        });
});

