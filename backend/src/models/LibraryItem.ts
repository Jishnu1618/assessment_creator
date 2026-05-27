import mongoose, { Schema, Document } from 'mongoose';

export interface ILibraryItem extends Document {
  title: string;
  type: 'document' | 'video' | 'link' | 'assignment';
  subject: string;
  size?: string;
  createdAt: Date;
}

const LibraryItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['document', 'video', 'link', 'assignment'] },
  subject: { type: String, required: true },
  size: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILibraryItem>('LibraryItem', LibraryItemSchema);
