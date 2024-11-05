import mongoose, { Schema, model, Document } from "mongoose";

// Enum for UserSex
enum UserSex {
  Male = "male",
  Female = "female",
}

interface IStudent extends Document {
  username: string;
  name: string;
  surname: string;
  email?: string; // Optional and unique
  phone?: string; // Optional and unique
  address: string;
  img?: string; // Optional
  bloodType: string;
  sex: UserSex; // Enum for 'male' or 'female'
  createdAt: Date;
  parent: Schema.Types.ObjectId; // Reference to Parent
  class: Schema.Types.ObjectId; // Reference to Class
  grade: Schema.Types.ObjectId; // Reference to Grade
  attendances: Schema.Types.ObjectId[]; // References to Attendance
  results: Schema.Types.ObjectId[]; // References to Result
  birthday: Date;
  password?: string;
}

const studentSchema = new Schema<IStudent>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true }, // Optional field, unique
  phone: { type: String, unique: true }, // Optional field, unique
  address: { type: String, required: true },
  img: { type: String }, // Optional field for image
  bloodType: { type: String, required: true },
  sex: { type: String, enum: Object.values(UserSex), required: true }, // Enum for 'male' or 'female'
  createdAt: { type: Date, default: Date.now }, // Default to current date
  parent: { type: Schema.Types.ObjectId, ref: "Parent", required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  grade: { type: Schema.Types.ObjectId, ref: "Grade", required: true },
  attendances: [{ type: Schema.Types.ObjectId, ref: "Attendance" }], // Array of Attendance IDs
  results: [{ type: Schema.Types.ObjectId, ref: "Result" }], // Array of Result IDs
  birthday: { type: Date, required: true }, // Birthday field
  password: String,
});

export const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
