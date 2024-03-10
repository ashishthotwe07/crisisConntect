import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password, confirm_password, username } = req.body;

      // Check if password and confirm_password match
      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in sign up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Set token as a cookie
      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ message: "Login successful", token  , user});
    } catch (error) {
      console.error("Error in sign in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signOut(req, res) {
    try {
      // Clear token cookie
      res.clearCookie("token");

      res.status(200).json({ message: "Sign-out successful" });
    } catch (error) {
      console.error("Error in sign out:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user fields dynamically
      Object.keys(updates).forEach((key) => {
        if (key !== "password") {
          user[key] = updates[key];
        }
      });

      // If password is provided, hash and update it separately
      if (updates.password) {
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        user.password = hashedPassword;
      }

      // Save the updated user
      await user.save();

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error in update user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      // Find the user by ID and delete
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error in delete user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
