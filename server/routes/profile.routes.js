const express = require("express");
const profileRoutes = express.Router();
const User = require("../models/User.model");

profileRoutes.get("/", (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("pets")
    .populate('home')
    .then(theUser => {
      // console.log(theUser);
      res.json(theUser);
    })
    .catch(err => console.log("DB error", err));
});

profileRoutes.post("/edit", (req, res) => {
  const { name, phone, description, imageUrl } = req.body.imageUrl;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, phone, description, imageUrl },
    { new: true }
  )
    .then(theUser => res.json(theUser))
    .catch(err => console.log("DB error", err));
});

module.exports = profileRoutes;
