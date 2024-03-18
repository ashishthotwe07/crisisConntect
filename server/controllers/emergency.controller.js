import EmergencyReport from "../models/emergency.model.js";
import transporter from "../config/nodemailer.js";
import User from "../models/user.model.js";
import { io } from "../server.js";

class EmergencyController {
  async createEmergencyReport(req, res) {
    try {
      const { type, address, details, phone, latitude, longitude } = req.body;

      const newEmergencyReport = new EmergencyReport({
        type: type,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        details: details,
        phone: phone,
        address: address,
        status: "reported",
        user: req.user._id,
      });

      const savedEmergencyReport = await newEmergencyReport.save();

      const matchingVolunteers = await User.find({
        skills_qualifications: type,
      });

      if (matchingVolunteers.length > 0) {
        await Promise.all(
          matchingVolunteers.map(async (volunteer) => {
            await sendEmailToVolunteer(volunteer, savedEmergencyReport);
          })
        );
      }

      const notificationMessage = {
        user: req.user._id,
        message: `A new emergency report of type "${formatReportType(
          type
        )}" has been reported at ${address}.`,
      };

      io.emit("newEmergencyReport", notificationMessage);

      res.status(201).json({ success: true, data: savedEmergencyReport });
    } catch (error) {
      console.error("Error creating emergency report:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  async getAllEmergencyReports(req, res) {
    try {
      const emergencyReports = await EmergencyReport.find();
      res.status(200).json({ success: true, data: emergencyReports });
    } catch (error) {
      console.error("Error retrieving all emergency reports:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  async getAllEmergencyReportsOfUsers(req, res) {
    try {
      const currentUserId = req.user._id;
      const emergencyReports = await EmergencyReport.find({
        user: currentUserId,
      });
      res.status(200).json({ success: true, data: emergencyReports });
    } catch (error) {
      console.error(
        "Error retrieving all emergency reports of the user:",
        error
      );
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  async getEmergencyReportById(req, res) {
    try {
      const { id } = req.params;
      const emergencyReport = await EmergencyReport.findById(id);
      if (!emergencyReport) {
        return res
          .status(404)
          .json({ success: false, error: "Report not found" });
      }
      res.status(200).json({ success: true, data: emergencyReport });
    } catch (error) {
      console.error("Error retrieving emergency report by ID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  async updateEmergencyReport(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedReport = await EmergencyReport.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      const notificationMessage = {
        user: req.user._id,
        message: `The ${updatedReport.type} emergency has been  ${updatedReport.status}".`,
      };
      io.emit("updatedNotification", notificationMessage);
      res.status(200).json({ success: true, data: updatedReport });
    } catch (error) {
      console.error("Error updating report status:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  async deleteEmergencyReport(req, res) {
    try {
      // Implement delete emergency report logic here
    } catch (error) {
      console.error("Error deleting emergency report:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
}

async function sendEmailToVolunteer(volunteer, emergencyReport) {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: volunteer.email,
    subject: "Emergency Report Notification",
    text: `Dear ${volunteer.user},\n\nA new emergency report of type "${emergencyReport.type}" has been reported at ${emergencyReport.address}.\n\nDetails: ${emergencyReport.details}\n\nPlease take necessary action.\n\nRegards,\nCrisisConnect Team`,
  };
  await transporter.sendMail(mailOptions);
}

function formatReportType(type) {
  return type.replace(/([A-Z])/g, " $1").trim();
}

export default new EmergencyController();
