import mongoose from "mongoose";

const { Schema } = mongoose;

const responseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emergencyReport: {
      type: Schema.Types.ObjectId,
      ref: "EmergencyReport",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;
