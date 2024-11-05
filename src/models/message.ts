import mongoose, { Document, Schema, Types } from "mongoose";

// Define the DirectReceiver interface
interface DirectReceiver {
  id: Types.ObjectId;
  model: "Teacher" | "Admin" | "Student" | "Parent";
}

// Define the MixedReceiver interface, containing an array of DirectReceivers
interface MixedReceiver {
  recipients: DirectReceiver[];
}

// Main message interface
interface IMessage extends Document {
  sender: {
    id: Types.ObjectId;
    model: "Teacher" | "Admin" | "Student" | "Parent";
    name: string;
  };
  receiver: DirectReceiver | MixedReceiver;
  content: string;
  type: "text" | "image" | "file";
  createdAt: Date;
  channel: string;
  isReaded: boolean;
}

// Define the schema for DirectReceiver
const DirectReceiverSchema = new Schema<DirectReceiver>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "receiver.model",
  },
  model: {
    type: String,
    enum: ["Teacher", "Admin", "Student", "Parent"],
    required: true,
  },
});

// Define the schema for MixedReceiver, which is an array of DirectReceiver
const MixedReceiverSchema = new Schema<MixedReceiver>({
  recipients: { type: [DirectReceiverSchema], required: true },
});

// Define the main Message schema
const MessageSchema: Schema = new Schema<IMessage>({
  sender: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "sender.model",
    },
    model: {
      type: String,
      enum: ["Teacher", "Admin", "Student", "Parent"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  receiver: {
    type: Schema.Types.Mixed, // Using Mixed to accommodate flexible types
    required: true,
  },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "file"], default: "text" },
  createdAt: { type: Date, default: Date.now },
  channel: { type: String, required: true },
  isReaded: { type: Boolean, default: false },
});

// Middleware to validate that `receiver` contains either DirectReceiver or MixedReceiver format
MessageSchema.pre("validate", function (next) {
  const isDirectReceiver = (receiver: any): receiver is DirectReceiver =>
    receiver.id && typeof receiver.model === "string";

  const isMixedReceiver = (receiver: any): receiver is MixedReceiver =>
    Array.isArray(receiver.recipients) &&
    receiver.recipients.every(isDirectReceiver);

  if (!isDirectReceiver(this.receiver) && !isMixedReceiver(this.receiver)) {
    return next(
      new Error(
        "Receiver must be either DirectReceiver or MixedReceiver format."
      )
    );
  }
  next();
});

// Add indexes for optimization
MessageSchema.index({ "sender.id": 1, "receiver.id": 1 });
MessageSchema.index({ channel: 1, createdAt: -1 });

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
