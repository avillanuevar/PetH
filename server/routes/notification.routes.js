const express = require("express");
const notificationRoutes = express.Router();
const Notifications = require("../models/Notifications.model");
const User = require("../models/User.model");



notificationRoutes.post("/create", (req, res) => {
  const {
    author,
    pets,
    reciver,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear
  } = req.body.author;
  console.log(req.body)

  Notifications.create({
    author,
    pets,
    reciver,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear
  })
    .then(notification => {
      User.findByIdAndUpdate(
        reciver,
        { notification: notification._id },
        { new: true }
      )

        .then(user => {
          res.json({ notification, user });
        })
        .catch(err => console.log(err));
         User.findByIdAndUpdate(
           reciver,
           { $addToSet: { notification: notification._id } },
           { new: true }
         );
    })
    .catch(err => console.log("DB error", err));
});

notificationRoutes.get("/details/:id", (req, res) => {
  const notificationId = req.params.id;
console.log('llegue al back')
  Notifications.findById(notificationId)
    .populate("author")
    .populate("pets")
    .populate('reciver')
    .then(theNotification => {
      return res.json(theNotification);
    })
    .catch(err => console.log("DB error", err));
});

notificationRoutes.post("/edit", (req, res) => {
  const {
    author,
    pets,
    reciver,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    _id
  } = req.body;

  const reservationId = _id;

  Notifications.findByIdAndUpdate(
    reservationId,
    {
      author,
      pets,
      reciver,
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear
    },
    { new: true }
  )
    .then(theNotification => res.json(theNotification))
    .catch(err => console.log("DB error", err));
});
notificationRoutes.get("/delete/:id", (req, res) => {
  let notificationId = req.params.id;
  console.log(notificationId);
  Notifications.findByIdAndDelete(notificationId)
    .then(() => {
      User.findByIdAndUpdate(req.user._id, { notification: null }, { new: true })
        .then(user => {
          res.json({ user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = notificationRoutes;
