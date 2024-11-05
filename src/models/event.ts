import mongoose, { Schema, model, Document } from "mongoose";

// Define the Event interface
interface IEvent extends Document {
  title: string; // Title of the event
  description: string; // Description of the event
  startTime: Date; // Start time of the event
  endTime: Date; // End time of the event
  class?: Schema.Types.ObjectId; // Populated reference to Class
}

// Create the Event schema
const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true }, // Title of the event
  description: { type: String, required: true }, // Description of the event
  startTime: { type: Date, required: true }, // Event start time
  endTime: { type: Date, required: true }, // Event end time
  class: { type: Schema.Types.ObjectId, ref: "Class" }, // Populated reference to Class
});

// Export the Event model
export const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
