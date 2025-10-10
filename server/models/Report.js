import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Email", "SMS", "Website", "Phone Call", "Social Media", "Other"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },
    additionalInfo: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;