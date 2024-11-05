import mongoose, { Schema, model, Document } from "mongoose";

// Define the Announcement interface
interface IAnnouncement extends Document {
  title: string; // Title of the announcement
  description: string; // Description of the announcement
  date: Date; // Date of the announcement
  class?: Schema.Types.ObjectId; // Populated reference to Class
}

// Create the Announcement schema
const announcementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true }, // Title of the announcement
  description: { type: String, required: true }, // Description of the announcement
  date: { type: Date, required: true }, // Date of the announcement
  class: { type: Schema.Types.ObjectId, ref: "Class" }, // Populated reference to Class
});

// Export the Announcement model
export const Announcement =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", announcementSchema);
