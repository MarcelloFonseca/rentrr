const MaintenanceRequest = require("../models/maintenance");
const TenantProperty = require("../models/tenantProperty");
exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const {
      requestTitle,
      description,
      category,
      urgencyLevel,
      preferredContactMethod,
      dateOfIssue,
      permissionToEnter,
    } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const findProperty = await TenantProperty.findOne({ user: userId });
    const newRequest = new MaintenanceRequest({
      requestTitle,
      description,
      property: findProperty.property,
      category,
      urgencyLevel,
      images,
      preferredContactMethod,
      dateOfIssue,
      user: userId,
      permissionToEnter,
    });

    await newRequest.save();
    return res.status(200).json({ success: true, data: newRequest });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find();
    return res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};

exports.getMaintenanceRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await MaintenanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update a maintenance request by ID
exports.updateMaintenanceRequestById = async (req, res) => {
  const { id } = req.params;
  const {
    requestTitle,
    description,
    category,
    urgencyLevel,
    preferredContactMethod,
    dateOfIssue,
    permissionToEnter,
  } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : [];

  try {
    let request = await MaintenanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    request.requestTitle = requestTitle || request.requestTitle;
    request.description = description || request.description;
    request.category = category || request.category;
    request.urgencyLevel = urgencyLevel || request.urgencyLevel;
    request.images = images.length > 0 ? images : request.images;
    request.preferredContactMethod =
      preferredContactMethod || request.preferredContactMethod;
    request.dateOfIssue = dateOfIssue || request.dateOfIssue;
    request.permissionToEnter =
      typeof permissionToEnter !== "undefined"
        ? permissionToEnter
        : request.permissionToEnter;

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.deleteMaintenanceRequestById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const request = await MaintenanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    await request.deleteOne();
    res.status(200).json({ msg: "Maintenance request removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getTenantMaintenance = async (req, res) => {
  try {
    const { userId } = req.user;
    const findMaintenance = await MaintenanceRequest.find({ user: userId });
    if (!findMaintenance) {
      return res
        .status(400)
        .json({ success: false, message: "No Request Found" });
    }
    return res.status(200).json({ success: true, data: findMaintenance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
