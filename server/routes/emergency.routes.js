import express from "express";
import EmergencyController from "../controllers/emergency.controller.js";
import verifyToken from "../middleware/Auth.js";

const router = express.Router();

// Route to create a new emergency report
router.post("/report", verifyToken, EmergencyController.createEmergencyReport);

// Route to retrieve all emergency reports
router.get("/reports", verifyToken, EmergencyController.getAllEmergencyReports);

router.get(
  "/users/reports",
  verifyToken,
  EmergencyController.getAllEmergencyReportsOfUsers
);

// Route to retrieve a specific emergency report by its ID
router.get("/reports/:id", EmergencyController.getEmergencyReportById);

// Route to update an existing emergency report
router.put("/reports/:id",verifyToken, EmergencyController.updateEmergencyReport);

// Route to delete an existing emergency report
router.delete("/reports/:id", EmergencyController.deleteEmergencyReport);

export default router;
