const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    imageUrl: String,
    street: String,
    postalCode: Number,
    city: String,
    country: String,
    class: {
      type: String,
      enum: ["apartment", "house"]
    },
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
    standardPrice: Number,
    petGrooming: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const HouseModel = mongoose.model("House", houseSchema);
module.exports = HouseModel;
