import mongoose, { Schema, model, Document } from "mongoose";

// Define the Result interface
interface IResult extends Document {
  score: number; // Score achieved by the student
  exam?: Schema.Types.ObjectId; // Populated reference to Exam
  assignment?: Schema.Types.ObjectId; // Populated reference to Assignment
  student: Schema.Types.ObjectId; // Linked Student
}

// Create the Result schema
const resultSchema = new Schema<IResult>({
  score: { type: Number, required: true }, // Score of the student
  exam: { type: Schema.Types.ObjectId, ref: "Exam" }, // Populated reference to Exam
  assignment: { type: Schema.Types.ObjectId, ref: "Assignment" }, // Populated reference to Assignment
  student: { type: Schema.Types.ObjectId, ref: "Student" }, // Populated reference to Student
});

// Export the Result model
export const Result =
  mongoose.models.Result || mongoose.model<IResult>("Result", resultSchema);
