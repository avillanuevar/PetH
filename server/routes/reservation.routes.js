const express = require("express");
const reservationsRoutes = express.Router();
const Reservation = require("../models/Reservation.model");
const User = require("../models/User.model");

reservationsRoutes.post("/create", (req, res) => {
  const {
    price,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear
  } = req.body;
    
  Reservation.create({
    price,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    details: req.user._id
  })
    .then(reservation => {
      User.findByIdAndUpdate(
        req.user._id,
        { reservation: reservation._id },
        { new: true }
      )

        .then(user => {
          res.json({ reservation, user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log("DB error", err));
});

reservationsRoutes.get("/details/:id", (req, res) => {
  const reservationId = req.params.id;
  Reservation.findById(reservationId)
    .then(theReservation => res.json(theReservation))
    .catch(err => console.log("DB error", err));
});

reservationsRoutes.post("/edit", (req, res) => {
  const {
    price,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    client,
    _id
  } = req.body;

  const reservationId = _id;

  Reservation.findByIdAndUpdate(
    reservationId,
    {
      price,
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
      $addToSet: { clients: client }
    },
    { new: true }
  )
    .then(theReservation => res.json(theReservation))
    .catch(err => console.log("DB error", err));
});
reservationsRoutes.get("/delete/:id", (req, res) => {
  let reservationId = req.params.id;
  console.log(reservationId);
  Reservation.findByIdAndDelete(reservationId)
    .then(() => {
     User.findByIdAndUpdate(
        req.user._id,
        { reservation: null},
        { new: true }
      )
        .then(user => {
          res.json({ user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = reservationsRoutes;
