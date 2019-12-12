const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
 
    price: Number,
    date: Date,
    clients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    details: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);

const ReservationModel = mongoose.model("Reservation", reservationSchema);
module.exports = ReservationModel;
