const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = require('./User.model.js')
const House = require("./House.model");
const Pet = require("./Pet.model");

const reservationSchema = new Schema(
  {
    price: {
      type: Number,
      default: 15
    },
    startDay: Number,
    startMonth: Number,
    startYear: Number,
    endDay: Number,
    endMonth: Number,
    endYear: Number,
    client: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    details: { type: Schema.Types.ObjectId, ref: "User" },
    totalPrice:Number
  },
  {
    timestamps: true
  }
);

const ReservationModel = mongoose.model("Reservation", reservationSchema);
module.exports = ReservationModel;
