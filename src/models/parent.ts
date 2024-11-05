import mongoose, { Schema, model, Document } from "mongoose";

interface IParent extends Document {
  username: string;
  name: string;
  surname: string;
  email?: string; // Optional and unique
  phone: string; // Required and unique
  address: string;
  createdAt: Date;
  students: Schema.Types.ObjectId[]; // References to Student
  password?: String;
}

const parentSchema = new Schema<IParent>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, unique: true }, // Optional field, unique
  phone: { type: String, required: true, unique: true }, // Required and unique
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Default to current date
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of Student IDs
  password: String,
});

export const Parent =
  mongoose.models.Parent || mongoose.model<IParent>("Parent", parentSchema);
