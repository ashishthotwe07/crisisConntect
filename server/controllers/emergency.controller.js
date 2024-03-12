import EmergencyReport from "../models/emergency.model.js";
import transporter from "../config/nodemailer.js";
import Volunteer from "../models/volunteer.model.js";
import { io } from "../server.js";
class EmergencyController {
  async createEmergencyReport(req, res) {
    try {
      const { type, address, details, phone, latitude, longitude } = req.body;

      // Create a new emergency report instance
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
        user: req.user._id, // Assuming you have access to the authenticated user's ID
      });

      // Save the new emergency report to the database
      const savedEmergencyReport = await newEmergencyReport.save();

      // Match emergency type with volunteer skills
      const matchingVolunteers = await Volunteer.find({
        skills_qualifications: type, // Query volunteers whose skills match the emergency type
      });

      if (matchingVolunteers.length > 0) {
        // Send notifications to matching volunteers
        await Promise.all(
          matchingVolunteers.map(async (volunteer) => {
            await sendEmailToVolunteer(volunteer, savedEmergencyReport);
          })
        );
      } else {
        console.log("NO", matchingVolunteers);
      }

      const notificationMessage = {
        user: req.user._id,
        message: `A new emergency report of type "${formatReportType(
          type
        )}" has been reported at ${address}.`,
      };

      // Emit new emergency report event with the notification message
      io.emit("newEmergencyReport", notificationMessage);

      res.status(201).json({ success: true, data: savedEmergencyReport });
    } catch (error) {
      console.error("Error creating emergency report:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  // Action to retrieve all emergency reports
  async getAllEmergencyReports(req, res) {
    try {
      // Fetch all emergency reports from the database
      const emergencyReports = await EmergencyReport.find();

      // Send the fetched emergency reports as a response
      res.status(200).json({ success: true, data: emergencyReports });
    } catch (error) {
      console.error("Error retrieving all emergency reports:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
  // Action to retrieve a specific emergency report by its ID
  async getEmergencyReportById(req, res) {
    try {
      // Implement get emergency report by ID logic here
    } catch (error) {
      console.error("Error retrieving emergency report by ID:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  // Action to update an existing emergency report
  async updateEmergencyReport(req, res) {
    try {
      // Implement update emergency report logic here
    } catch (error) {
      console.error("Error updating emergency report:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }

  // Action to delete an existing emergency report
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
  // Construct email message
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: volunteer.contact_information,
    subject: "Emergency Report Notification",
    text: `Dear ${volunteer.user},\n\nA new emergency report of type "${emergencyReport.type}" has been reported at ${emergencyReport.address}.\n\nDetails: ${emergencyReport.details}\n\nPlease take necessary action.\n\nRegards,\nCrisisConnect Team`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

// Function to format the report type
function formatReportType(type) {
  return type.replace(/([A-Z])/g, ' $1').trim(); // Insert space before capital letters
}


export default new EmergencyController();