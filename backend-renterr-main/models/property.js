const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    streetAddress: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["apartment", "house", "condo", "townhouse", "duplex", "studio"],
    },
    uniquePropertyCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("properties", propertySchema);

module.exports = Property;
