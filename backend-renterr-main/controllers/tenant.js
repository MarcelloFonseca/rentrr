const UserModel = require("../models/users");

const LandlordProperty = require("../models/property");
const TenantProperty = require("../models/tenantProperty");

exports.linkProperty = async (req, res) => {
  try {
    const { userId } = req.user;
    const { uniquePropertyCode } = req.body;
    console.log(uniquePropertyCode);
    console.log(userId);
    const landlordProperty = await LandlordProperty.findOne({
      uniquePropertyCode,
    });

    if (!landlordProperty) {
      return res
        .status(404)
        .json({ status: false, message: "Property not found" });
    }

    const newTenantProperty = new TenantProperty({
      property: landlordProperty._id,
      tenant: userId,
    });

    const savedTenantProperty = await newTenantProperty.save();

    return res.status(201).json({
      status: true,
      message: "Property linked successfully",
      data: savedTenantProperty,
    });
  } catch (error) {
    console.error("Error linking property:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
