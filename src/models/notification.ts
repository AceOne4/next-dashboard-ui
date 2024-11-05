import mongoose, { Document, Schema, Types } from "mongoose";

// Define the DirectReceiver interface
interface DirectReceiver {
  id: Types.ObjectId;
  role: "admin" | "teacher" | "student" | "parent";
}

// Define the MixedReceiver interface, containing an array of DirectReceivers
interface MixedReceiver {
  recipients: DirectReceiver[];
}

interface INotification extends Document {
  creater: {
    id: Schema.Types.ObjectId;
    role: "admin" | "teacher" | "student" | "parent";
  };
  recipient: DirectReceiver | MixedReceiver;
  type: "message" | "announcement" | "event";
  content: string;
  relatedId: Schema.Types.ObjectId; // To link the notification to a message, event, or announcement
  createdAt: Date;
  isRead: boolean;
}

const DirectReceiverSchema = new Schema<DirectReceiver>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "receiver.model",
  },
  role: {
    type: String,
    enum: ["Teacher", "Admin", "Student", "Parent"],
    required: true,
  },
});

// Define the schema for MixedReceiver, which is an array of DirectReceiver
const MixedReceiverSchema = new Schema<MixedReceiver>({
  recipients: { type: [DirectReceiverSchema], required: true },
});

const NotificationSchema: Schema = new Schema({
  creater: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "recipient.role",
    }, // Dynamically references the role model
    role: {
      type: String,
      required: true,
      enum: ["admin", "teacher", "student", "parent"], // Defines the role to reference the appropriate collection
    },
  },
  recipient: {
    type: Schema.Types.Mixed, // Using Mixed to accommodate flexible types
    required: true,
  },
  type: {
    type: String,
    enum: ["message", "announcement", "event"],
    required: true,
  }, // Type of notification
  content: { type: String, required: true }, // The content of the notification (text)
  relatedId: { type: Schema.Types.ObjectId, required: true }, // ID of the related message, event, or announcement
  createdAt: { type: Date, default: Date.now }, // When the notification was created
  isRead: { type: Boolean, default: false }, // Whether the notification has been read by the recipient
});

// Indexes for optimization
NotificationSchema.index({ "recipient.id": 1, createdAt: -1 });
NotificationSchema.index({ isRead: 1 });
NotificationSchema.index({ type: 1, createdAt: -1 });

const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
