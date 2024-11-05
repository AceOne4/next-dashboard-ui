import mongoose, { Schema, model, Document } from "mongoose";

interface IGrade extends Document {
  level: number; // Unique grade level
  students: Schema.Types.ObjectId[]; // References to Student
  classes: Schema.Types.ObjectId[]; // References to Class
}

const gradeSchema = new Schema<IGrade>({
  level: { type: Number, required: true, unique: true }, // Unique grade level
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of Student IDs
  classes: [{ type: Schema.Types.ObjectId, ref: "Class" }], // Array of Class IDs
});

export const Grade =
  mongoose.models.Grade || mongoose.model<IGrade>("Grade", gradeSchema);
