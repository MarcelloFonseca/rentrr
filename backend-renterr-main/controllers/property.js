const PropertyModel = require("../models/property");

exports.addProperty = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      streetAddress,
      city,
      state,
      zipCode,
      country,
      propertyType,
      uniquePropertyCode,
    } = req.body;

    const property = await PropertyModel.create({
      streetAddress,
      city,
      state,
      zipCode,
      country,
      propertyType,
      user: userId,
      uniquePropertyCode,
    });

    return res.status(200).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const { userId } = req.user;
    const getProperty = await PropertyModel.find({ user: userId });
    return res.status(200).json({ success: true, data: getProperty });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
