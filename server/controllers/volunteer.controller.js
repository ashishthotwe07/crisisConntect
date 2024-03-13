import User from "../models/user.model.js";

class VolunteerController {
  async create(req, res) {
    try {
      console.log("here are we");
      const userId = req.user._id;

      console.log(userId);
      // Check if the user already exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found", user });
      }

      // Check if the user is already a volunteer
      if (user.role === "volunteer") {
        return res.status(400).json({ error: "User is already a volunteer" });
      }

      // Update the user role and volunteer fields
      user.role = "volunteer";

      await user.save();

      return res.status(200).json({ message: "You are Now a volunteer", user });
    } catch (error) {
      console.error("Error creating volunteer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      // Find all volunteers
      const volunteers = await User.find({ role: "volunteer" });

      return res.status(200).json(volunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req, res) {
    try {
      const { volunteerId } = req.params;

      // Find the volunteer by ID
      const volunteer = await User.findById(volunteerId);

      if (!volunteer) {
        return res.status(404).json({ error: "Volunteer not found" });
      }

      return res.status(200).json(volunteer);
    } catch (error) {
      console.error("Error fetching volunteer by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new VolunteerController();
