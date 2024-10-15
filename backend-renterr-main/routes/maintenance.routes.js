const express = require("express");
const router = express.Router();
const {
  createMaintenanceRequest,
  getAllMaintenanceRequests,
  getMaintenanceRequestById,
  updateMaintenanceRequestById,
  deleteMaintenanceRequestById,
  getTenantMaintenance,
} = require("../controllers/maintenance");
const Auth = require("../middleware/userAuth");
const { upload } = require("../utils/upload");

router.post(
  "/maintenance",
  upload.array("images"),
  Auth(["tenant"]),
  createMaintenanceRequest
);

router.get("/maintenance", Auth(["landlord"]), getAllMaintenanceRequests);

router.get("/maintenance/:id", getMaintenanceRequestById);
router.get("/tenantmaintenance", Auth(["tenant"]), getTenantMaintenance);

router.patch(
  "/maintenance/:id",
  upload.array("images"),
  updateMaintenanceRequestById
);

router.delete("/maintenancedelete/:id", deleteMaintenanceRequestById);

module.exports = router;
