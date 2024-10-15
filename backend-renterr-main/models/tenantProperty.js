const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantPropertySchema = new Schema(
  {
    property: {
      type: mongoose.Types.ObjectId,
      ref: "properties",
      required: true,
    },
    tenant: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true, 
    },
    leaseStartDate: {
      type: Date,
      //   required: true,
    },
    leaseEndDate: {
      type: Date,
      //   required: true,
    },
    rentAmount: {
      type: Number,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TenantProperty = mongoose.model("tenantproperty", tenantPropertySchema);

module.exports = TenantProperty;
