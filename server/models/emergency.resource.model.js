import mongoose from "mongoose";

const { Schema } = mongoose;

const emergencyResourceSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
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
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  },
  { timestamps: true }
);

emergencyResourceSchema.index({ location: "2dsphere" });

const EmergencyResource = mongoose.model(
  "EmergencyResource",
  emergencyResourceSchema
);

export default EmergencyResource;
