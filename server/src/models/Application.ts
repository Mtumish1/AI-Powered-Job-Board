import mongoose, { Schema, Document } from 'mongoose';

// Define interface
export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  appliedAt: Date;
}

// Schema definition
const applicationSchema = new Schema<IApplication>({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApplication>('Application', applicationSchema);
