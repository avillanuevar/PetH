const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./User.model.js");
const House = require("./House.model");
const Pet = require("./Pet.model");

const notificationSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    reciver: { type: Schema.Types.ObjectId, ref: "User" },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    startDay: Number,
    startMonth: Number,
    startYear: Number,
    endDay: Number,
    endMonth: Number,
    endYear: Number,
    reservationId:String
  },
  {
    timestamps: true
  }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);
module.exports = NotificationModel;
