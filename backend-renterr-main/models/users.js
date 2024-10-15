const mongoose = require("mongoose");
const emailRegex = /^\S+@\S+\.\S+$/;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: "Invalid email address format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["tenant", "landlord"],
      // default: "tenant",
      // required: true,
    },
    // rentalProperty: {
    //   propertyNameOrId: {
    //     type: String,
    //     required: function () {
    //       return this.role === "tenant";
    //     },
    //   },
    //   unitNumber: {
    //     type: String,
    //     required: function () {
    //       return this.role === "tenant";
    //     },
    //   },
    // },
    // properties: [
    //   {
    //     propertyName: {
    //       type: String,
    //       required: function () {
    //         return this.role === "landlord";
    //       },
    //     },
    //     address: {
    //       type: String,
    //       required: function () {
    //         return this.role === "landlord";
    //       },
    //     },
    //     numberOfUnits: {
    //       type: Number,
    //       required: function () {
    //         return this.role === "landlord";
    //       },
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

const User = mongoose.model("user", userSchema);

module.exports = User;
