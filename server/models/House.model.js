const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    title:String,
    imageUrl: String,
    street: String,
    postalCode: Number,
    city: String,
    country: String,
    home: {
      type: String,
      enum: ["Apartment", "House"]
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    
    petGrooming: {
      type: Boolean,
      default: false
    },
    start:[Number],
    end:[Number]
  },
  {
    timestamps: true
  }
);

const HouseModel = mongoose.model("House", houseSchema);
module.exports = HouseModel;
