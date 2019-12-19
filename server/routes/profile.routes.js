const express = require("express");
const profileRoutes = express.Router();
const User = require("../models/User.model");
const Reservation =require('../models/Reservation.model')

profileRoutes.get("/", (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("pets")
    .populate("home")

    .populate({
      path: "notification",
      populate: {
        path: "pets"
      }
    })
    .populate({
      path: "notification",
      populate: {
        path: "author",
        model: "User"
      }
    })
    .populate({
      path: "houseReservation",
      populate: {
        path:'client',
        path: "details",
        populate:'home',
      }
    })
    .populate({
      path: "petReservation",
      populate: {
        path: "details",
        path:'client'

      }
    })
    .then(theUser => {
      // console.log(theUser);
      res.json(theUser);
    })
    .catch(err => console.log("DB error", err));
});

profileRoutes.post("/edit", (req, res) => {
  const {
    name,
    phone,
    description,
    imageUrl,
    _id,
    petReservation,
    copyPets
  } = req.body.imageUrl;
  const userId = _id;
  console.log("reserva de mascota", petReservation);
  console.log("array de pets", copyPets);

  User.findByIdAndUpdate(
    userId,
    {
      name,
      phone,
      description,
      imageUrl,
      $addToSet: { petReservation: petReservation }
    },
    { new: true }
  )
    .then(theUser => {
      Reservation.findByIdAndUpdate(
        petReservation,
        {
          $addToSet: { client: { $each: copyPets } }
        },
        { new: true }
      )
        .then(theReservation => {
          console.log("ESTA ES LA RESERVA", theReservation);
          console.log("ESTE ES EL USER", theUser);
          res.json({ theReservation, theUser });
        })
        .catch(err => console.log("DB error", err));
    })
    .catch(err => console.log("DB error", err));
});

module.exports = profileRoutes;
