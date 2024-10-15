const User = require("../models/users");

exports.signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    role,
    rentalProperty,
    properties,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      fullName,
      email,
      password,
      phoneNumber,
      role,
      rentalProperty: role === "tenant" ? rentalProperty : undefined,
      properties: role === "landlord" ? properties : undefined,
    });

    await user.save();
    const token = user.createJWT();
    // Respond with user _id
    res.status(201).json({
      success: true,
      data: { _id: user._id, fullName: user.fullName },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = user.createJWT();

    res.status(200).json({
      sucess: true,
      data: {
        role: user.role,
        _id: user._id,
        fullName: user.fullName,
        token,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.selectRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || (role !== "tenant" && role !== "landlord")) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const findUser = await User.findOneAndUpdate(
      { _id: id },
      { role: role },
      { new: true }
    );
    const token = findUser.createJWT();
    console.log(findUser.role);
    res.status(200).json({
      message: "Role selected",
      data: { role: findUser.role, fullName: findUser.fullName, token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
