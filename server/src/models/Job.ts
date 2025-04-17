import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for Job document
export interface IJob extends Document {
  title: string; // Job title
  description: string; // Job description
  company: string; // Company name
  location: string; // Job location
  recruiter: Schema.Types.ObjectId; // Reference to recruiter (User)
  createdAt: Date; // Job posting date
}

// Define the Job schema
const jobSchema: Schema<IJob> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model (Recruiter)
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Export the Job model
export default mongoose.model<IJob>('Job', jobSchema);
