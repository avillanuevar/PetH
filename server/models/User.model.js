const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pet = require("./Pet.model");
const Reservation = require("./Reservation.model");
const House = require("./House.model");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    imageUrl: String,
    phone: Number,
    description: String,
    class: {
      type: String,
      default: "client",
      enum: ["client", "host"]
    },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    home: { type: Schema.Types.ObjectId, ref: "House" },
    houseReservation: {
      type: Schema.Types.ObjectId,
      ref: "Reservation"
    },
    petReservation: { type: Schema.Types.ObjectId, ref: "Reservation" }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
