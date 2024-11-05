import mongoose, { Schema, model, Document } from "mongoose";

enum DayOfWeek {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
}

interface ILesson extends Document {
  name: string; // Name of the lesson
  day: DayOfWeek; // Day of the week (e.g., 'Monday', 'Tuesday', etc.)
  startTime: Date; // Start time of the lesson
  endTime: Date; // End time of the lesson
  subject: Schema.Types.ObjectId; // Reference to Subject
  class: Schema.Types.ObjectId; // Reference to Class
  teacher: Schema.Types.ObjectId; // Reference to Teacher
  exams: Schema.Types.ObjectId[]; // References to Exam
  assignments: Schema.Types.ObjectId[]; // References to Assignment
  attendances: Schema.Types.ObjectId[]; // References to Attendance
}

const lessonSchema = new Schema<ILesson>({
  name: { type: String, required: true }, // Name of the lesson
  day: { type: String, enum: Object.values(DayOfWeek), required: true }, // Day of the week
  startTime: { type: Date, required: true }, // Start time
  endTime: { type: Date, required: true }, // End time
  subject: { type: Schema.Types.ObjectId, ref: "Subject" }, // Reference to Subject
  class: { type: Schema.Types.ObjectId, ref: "Class" }, // Reference to Class
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher" }, // Reference to Teacher
  exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }], // Array of Exam IDs
  assignments: [{ type: Schema.Types.ObjectId, ref: "Assignment" }], // Array of Assignment IDs
  attendances: [{ type: Schema.Types.ObjectId, ref: "Attendance" }], // Array of Attendance IDs
});

export const Lesson =
  mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);
