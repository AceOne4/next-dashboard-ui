import mongoose, { Schema, model, Document } from "mongoose";

interface IClass extends Document {
  name: string; // Unique name for the class
  capacity: number; // Capacity of the class
  supervisor?: Schema.Types.ObjectId; // Reference to Teacher
  lessons: Schema.Types.ObjectId[]; // References to Lesson
  students: Schema.Types.ObjectId[]; // References to Student
  grade: Schema.Types.ObjectId; // Reference to Grade
  events: Schema.Types.ObjectId[]; // References to Event
  announcements: Schema.Types.ObjectId[]; // References to Announcement
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true, unique: true }, // Unique name for the class
  capacity: { type: Number, required: true }, // Capacity of the class
  supervisor: { type: Schema.Types.ObjectId, ref: "Teacher" }, // Reference to Teacher
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }], // Array of Lesson IDs
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of Student IDs
  grade: { type: Schema.Types.ObjectId, ref: "Grade" }, // Reference to Grade
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }], // Array of Event IDs
  announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }], // Array of Announcement IDs
});

// Auto-increment logic for 'id' can be implemented with a pre-save hook or a separate counter collection if needed.

export const Class =
  mongoose.models.Class || mongoose.model<IClass>("Class", classSchema);
