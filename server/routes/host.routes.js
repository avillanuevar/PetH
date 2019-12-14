const express = require("express");
const hostRoutes = express.Router();
const House = require("../models/House.model");
const User = require("../models/User.model");

hostRoutes.post("/create", (req, res) => {
  const {
    title,
    imageUrl,
    street,
    postalCode,
    city,
    country,
    home,
    owner,
    standardPrice,
    petGrooming
  } = req.body.title;

  House.create({
    title,
    imageUrl,
    street,
    postalCode,
    city,
    country,
    home,
    owner,
    standardPrice,
    petGrooming,
    owner: req.user._id
  })
    .then(home => {
      User.findByIdAndUpdate(
        req.user._id,
        { $set: { home: home._id, class: "host" } },
        { new: true }
      ).then(user => {
        console.log(user);

        res.json({ home, user });
      });
    })

    .catch(err => console.log("DB error", err));
});

hostRoutes.get("/details/:id", (req, res) => {
  const houseId = req.params.id;
  House.findById(houseId)
    .then(theHouse => res.json(theHouse))
    .catch(err => console.log("DB error", err));
});

hostRoutes.post("/edit", (req, res) => {
  const {
      title,
    imageUrl,
    street,
    postalCode,
    city,
    country,
    home,
    owner,
    standardPrice,
    petGrooming,
    _id
  } = req.body;

  const homeId = _id;
console.log(_id)
  House.findByIdAndUpdate(
    homeId,
    {
      title,
      imageUrl,
      street,
      postalCode,
      city,
      country,
      home,
      owner,
      standardPrice,
      petGrooming
    },
    { new: true }
  )
    .then(theHome => {
        console.log(theHome)
        res.json(theHome);
    })
    .catch(err => console.log("DB error", err));
});
hostRoutes.get("/delete/:id", (req, res) => {
  let homeId = req.params.id;
  console.log(homeId);
  House.findByIdAndDelete(homeId)
    .then(() => {
      User.findByIdAndUpdate(
        req.user._id,
        { home: null, class: "client" },
        { new: true }
      )
        .then(user => {
          res.json({ user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = hostRoutes;
