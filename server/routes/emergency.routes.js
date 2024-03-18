import express from "express";
import EmergencyController from "../controllers/emergency.controller.js";
import verifyToken from "../middleware/Auth.js";

const router = express.Router();

router.post("/report", verifyToken, EmergencyController.createEmergencyReport);

router.get("/reports", EmergencyController.getAllEmergencyReports);

router.get("/users/reports", verifyToken, EmergencyController.getAllEmergencyReportsOfUsers);

router.get("/reports/:id", EmergencyController.getEmergencyReportById);

router.put("/reports/:id", verifyToken, EmergencyController.updateEmergencyReport);

router.delete("/reports/:id", EmergencyController.deleteEmergencyReport);

export default router;
