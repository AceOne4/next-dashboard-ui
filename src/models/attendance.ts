import mongoose, { Schema, model, Document } from "mongoose";

// Define the Attendance interface
interface IAttendance extends Document {
  date: Date; // Date of attendance
  present: boolean; // Indicates if the student was present
  student: Schema.Types.ObjectId; // Linked Student
  lesson: Schema.Types.ObjectId; // Linked Lesson
}

// Create the Attendance schema
const attendanceSchema = new Schema<IAttendance>({
  date: { type: Date, required: true }, // Date of attendance
  present: { type: Boolean, required: true }, // Attendance status
  student: { type: Schema.Types.ObjectId, ref: "Student" }, // Populated reference to Student
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" }, // Populated reference to Lesson
});

// Export the Attendance model
export const Attendance =
  mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", attendanceSchema);
