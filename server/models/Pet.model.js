const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/User.model");

const petSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    age: Number,
    description: String,
    careDetails: String,
    agresiveWithAnimals: {
      type: Boolean,
      default: false
    },
    agresiveWithPeople: {
      type: Boolean,
      default: false
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
