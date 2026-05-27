import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionType {
  type: string;
  count: number;
  marks: number;
}

export interface IQuestion {
  id: number;
  text: string;
  difficulty: string;
  marks: number;
}

export interface IAnswer {
  id: number;
  text: string;
  formula?: string;
}

export interface IGeneratedPaper {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maxMarks: number;
  instructions: string;
  questions: IQuestion[];
  answers: IAnswer[];
}

export interface IAssignment extends Document {
  title: string;
  className: string;
  subject: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  uploadedFileName?: string;
  uploadedFileSize?: string;
  questionTypes: IQuestionType[];
  additionalInfo?: string;
  generatedPaper?: IGeneratedPaper;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeSchema = new Schema<IQuestionType>({
  type: { type: String, required: true },
  count: { type: Number, required: true },
  marks: { type: Number, required: true },
});

const QuestionSchema = new Schema<IQuestion>({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  difficulty: { type: String, required: true },
  marks: { type: Number, required: true },
});

const AnswerSchema = new Schema<IAnswer>({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  formula: { type: String },
});

const GeneratedPaperSchema = new Schema<IGeneratedPaper>({
  schoolName: { type: String, default: 'Delhi Public School, Sector-4, Bokaro' },
  subject: { type: String, required: true },
  className: { type: String, required: true },
  timeAllowed: { type: String, default: '45 minutes' },
  maxMarks: { type: Number, default: 0 },
  instructions: { type: String, default: 'All questions are compulsory unless stated otherwise.' },
  questions: { type: [QuestionSchema], default: [] },
  answers: { type: [AnswerSchema], default: [] },
});

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    className: { type: String, required: true, default: 'Class: 8th' },
    subject: { type: String, required: true, default: 'Science' },
    assignedDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'generating', 'completed', 'failed'],
      default: 'pending',
    },
    progress: { type: Number, default: 0 },
    uploadedFileName: { type: String },
    uploadedFileSize: { type: String },
    questionTypes: { type: [QuestionTypeSchema], default: [] },
    additionalInfo: { type: String },
    generatedPaper: { type: GeneratedPaperSchema },
  },
  { timestamps: true }
);

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
