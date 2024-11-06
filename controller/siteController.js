const User = require("../models/user");
const Visit = require("../models/visit");

var day = new Date();

const profile = (req, res) => {
  User.find({ rfid: req.params.rfid })
    .exec()
    .then((result) => {
      res.render("profile", { profile_info: result[0] });
    })
    .catch((err) => {
      console.log(err);
    });
};

const visit_done_post = (req, res) => {
  var dd = String(day.getDate()).padStart(2, "0");
  var mm = String(day.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = day.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  User.find({ rfid: req.params.rfid })
    .exec()
    .then((result) => {
      var time = new Date();
      const visit = new Visit({
        reason: req.body.reason,
        details: req.body.details,
        medications: req.body.medications,
        nurse: req.body.nurse,
        rfid: req.params.rfid,
        name: result[0].name,
        student_id: result[0].student_id,
        section: result[0].section,
        date: today,
        time_start: req.params.time,
        time_end:
          time.getHours() +
          ":" +
          String(time.getMinutes()).padStart(2, "0") +
          ":" +
          String(time.getSeconds()).padStart(2, "0"),
      });

      visit
        .save()
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  profile,
  visit_done_post,
};
