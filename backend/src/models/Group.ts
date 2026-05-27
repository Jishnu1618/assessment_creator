import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  subject: string;
  students: number;
  color: string;
  createdAt: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  students: { type: Number, required: true, default: 0 },
  color: { type: String, required: true, default: 'bg-orange-100 text-orange-700' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGroup>('Group', GroupSchema);
