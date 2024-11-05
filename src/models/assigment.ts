import mongoose, { Schema, model, Document } from "mongoose";

// Define the Assignment interface
interface IAssignment extends Document {
  title: string; // Title of the assignment
  startDate: Date; // Start date of the assignment
  dueDate: Date; // Due date for the assignment
  lesson: Schema.Types.ObjectId; // Linked Lesson
  results: Schema.Types.ObjectId[]; // Linked results for students
}

// Create the Assignment schema
const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true }, // Title of the assignment
  startDate: { type: Date, required: true }, // Assignment start date
  dueDate: { type: Date, required: true }, // Assignment due date
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" }, // Populated reference to Lesson
  results: [{ type: Schema.Types.ObjectId, ref: "Result" }], // Array of results references
});

// Export the Assignment model
export const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", assignmentSchema);
