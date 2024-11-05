import mongoose, { Schema, model, Document } from "mongoose";

interface ISubject extends Document {
  name: string; // Unique name for the subject
  teachers: Schema.Types.ObjectId[]; // References to Teacher
  lessons: Schema.Types.ObjectId[]; // References to Lesson
}

const subjectSchema = new Schema<ISubject>({
  name: { type: String, required: true, unique: true }, // Unique name for the subject
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }], // Array of Teacher IDs
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }], // Array of Lesson IDs
});

export const Subject =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", subjectSchema);
