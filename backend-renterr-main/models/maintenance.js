const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maintenanceRequestSchema = new Schema(
  {
    requestTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: "properties",
      // required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Plumbing", "Electrical", "Heating", "Other"],
    },
    urgencyLevel: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    images: {
      type: [String],
      required: false,
    },
    preferredContactMethod: {
      type: String,
      required: true,
      enum: ["Phone", "Email", "In-app Message"],
    },
    dateOfIssue: {
      type: Date,
      required: true,
    },
    permissionToEnter: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);

module.exports = MaintenanceRequest;
