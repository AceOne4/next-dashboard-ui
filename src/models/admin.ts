import mongoose, { Schema, model, Document } from "mongoose";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

export const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
