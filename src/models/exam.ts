import mongoose, { Schema, model, Document } from "mongoose";

// Define the Exam interface
interface IExam extends Document {
  title: string; // Title of the exam
  startTime: Date; // Start time of the exam
  endTime: Date; // End time of the exam
  lesson: Schema.Types.ObjectId; // Linked Lesson
  results: Schema.Types.ObjectId[]; // Linked results for students
}

// Create the Exam schema
const examSchema = new Schema<IExam>({
  title: { type: String, required: true }, // Title of the exam
  startTime: { type: Date, required: true }, // Exam start time
  endTime: { type: Date, required: true }, // Exam end time
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" }, // Populated reference to Lesson
  results: [{ type: Schema.Types.ObjectId, ref: "Result" }], // Array of results references
});

// Export the Exam model
export const Exam =
  mongoose.models.Exam || mongoose.model<IExam>("Exam", examSchema);
