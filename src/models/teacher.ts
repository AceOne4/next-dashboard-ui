import mongoose, { Schema, model, Document } from "mongoose";

// Enum for UserSex
enum UserSex {
  Male = "male",
  Female = "female",
}

interface ITeacher extends Document {
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
  subjects: Schema.Types.ObjectId[]; // References to Subject
  lessons: Schema.Types.ObjectId[]; // References to Lesson
  classes: Schema.Types.ObjectId[]; // References to Class
  birthday: Date;
  password?: string;
}

const teacherSchema = new Schema<ITeacher>({
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
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }], // Array of Subject IDs
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }], // Array of Lesson IDs
  classes: [{ type: Schema.Types.ObjectId, ref: "Class" }], // Array of Class IDs
  birthday: { type: Date, required: true }, // Birthday field
  password: String,
});

export const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", teacherSchema);
