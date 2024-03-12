import mongoose from "mongoose";

const { Schema } = mongoose;

const volunteerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: 'User', // Name of the User model
      required: true,
    },
    skills_qualifications: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    contact_information: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

volunteerSchema.index({ location: "2dsphere" });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
