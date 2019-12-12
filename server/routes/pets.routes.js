const express = require("express");
const petsRoutes = express.Router();
const Pet = require("../models/Pet.model");
const User = require("../models/User.model");

petsRoutes.post("/create", (req, res) => {
  const {
    name,
    age,
    description,
    careDetails,
    agresiveWithAnimals,
    agresiveWithPeople,
    imageUrl
  } = req.body.name;
  console.log(req.body);
  Pet.create({
    name,
    age,
    careDetails,
    description,
    imageUrl,
    agresiveWithAnimals,
    agresiveWithPeople,
    owner: req.user._id
  })
    .then(pet => {
      User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { pets: pet._id } },
        { new: true }
      )

        .then(user => {
          console.log(user);
          res.json(pet);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log("DB error", err));
});

petsRoutes.get("/details/:id", (req, res) => {
  const petId = req.params.id;
  Pet.findById(petId)
    .then(thePet => res.json(thePet))
    .catch(err => console.log("DB error", err));
});

petsRoutes.post("/edit", (req, res) => {
  const {
    name,
    age,
    description,
    careDetails,
    agresiveWithAnimals,
    agresiveWithPeople,
    imageUrl,
    _id
  } = req.body.name;  

  const petId = _id;

  Pet.findByIdAndUpdate(
    petId,
    {
      name,
      age,
      description,
      careDetails,
      agresiveWithAnimals,
      agresiveWithPeople,
      imageUrl
    },
    { new: true }
  )
    .then(thePet => res.json(thePet))
    .catch(err => console.log("DB error", err));
});
petsRoutes.get("/delete/:id", (req, res) => {
  let petId = req.params.id;
  console.log(petId);
  Pet.findByIdAndDelete(petId)
    .then(() => res.send({ message: "mascota borrada" }))
    .catch(err => console.log(err));
});

module.exports = petsRoutes;
