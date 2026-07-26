import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
  name: {
    type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  company: {
    type: String,
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
  },
  phone: {
    type: String,
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
  },
  serviceInterest: {
    type: String,
    enum: [
      'AI Agent Development',
      'WhatsApp AI',
      'AI Customer Support',
      'AI Voice Calling',
      'AI Sales Automation',
      'AI Business Automation',
      'Other'
    ],
  },
  message: {
    type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Create index on email for faster lookups
LeadSchema.index({ email: 1 });
LeadSchema.index({ createdAt: -1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
