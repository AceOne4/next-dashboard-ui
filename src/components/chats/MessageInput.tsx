import React, { useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import Picker from "emoji-picker-react"; // Default import for Picker
import { sendMessage, sendTypingStatus } from "@/lib/actionServer";
import {
  capitalizeFirstChar,
  getDirectChannelId,
  getGroupChannelId,
  getUserType,
} from "@/lib/helpers";

export type Contact = TTeacher | TStudent | TParent;

export type GroupChat = {
  id: string;
  className: string;
  classId: string;
  classMembers: {
    id: string;
    model: "Teacher" | "Admin" | "Student" | "Parent";
  }[];
};

interface MessageInputProps {
  sessionId: string;
  selectedContact: Contact | GroupChat | null;
  role: string;
  name: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  selectedContact,
  sessionId,
  role,
  name,
}) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for typing timeout

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() || attachment) {
      let reciver: DirectReceiver | MixedReceiver;
      const sender = {
        id: sessionId as string,
        model: capitalizeFirstChar(role) as
          | "Teacher"
          | "Admin"
          | "Student"
          | "Parent",
        name,
      };

      if ((selectedContact as GroupChat).classId) {
        const recipients = (selectedContact as GroupChat).classMembers;
        reciver = {
          recipients: recipients.map((member) => ({
            id: member.id,
            model: member.model,
          })),
        };

        await sendMessage({
          message,
          sender,
          reciver,
          channel: getGroupChannelId((selectedContact as GroupChat).classId),
        });
      } else {
        reciver = {
          id: (selectedContact as Contact)._id as string,
          model: getUserType(selectedContact as Contact),
        };

        await sendMessage({
          message,
          sender,
          reciver,
          channel: getDirectChannelId(reciver.id, sender.id),
        });
      }

      resetInput();
      stopTyping(); // Stop typing indicator when message is sent
    }
  };

  const resetInput = () => {
    setMessage("");
    setAttachment(null); // Clear the attachment after sending
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false); // Close the picker after selecting an emoji
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file); // Set the selected file
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null); // Remove the current attachment
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    // Send typing indicator to the receiver
    if ((selectedContact as GroupChat).classId) {
      sendTypingStatus(
        getGroupChannelId((selectedContact as GroupChat).classId),
        sessionId,
        true
      );
    } else {
      sendTypingStatus(
        getDirectChannelId(
          (selectedContact as Contact)._id as string,
          sessionId
        ),
        sessionId,
        true
      );
    }

    // Clear previous timeout and set a new one
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing indicator after 5 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 5000);
  };

  const stopTyping = () => {
    if (selectedContact?.id === "puplic") {
      sendTypingStatus(
        getGroupChannelId((selectedContact as GroupChat).classId),
        sessionId,
        false
      );
    } else {
      sendTypingStatus(
        getDirectChannelId(
          (selectedContact as Contact)._id as string,
          sessionId
        ),
        sessionId,
        false
      );
    }
  };
  return (
    <div className="relative">
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          className="border rounded-lg p-2 flex-grow focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="border border-yellow-400 text-white rounded-lg p-2  hover:bg-lamaYellowLight transition hover:border-none hover:shadow-sm shadow-yellow-600"
        >
          😊
        </button>

        {/* Hidden file input for attaching files */}
        <input
          type="file"
          accept="image/*, .pdf"
          onChange={handleAttachmentChange}
          className="ml-2 hidden"
          id="attachment"
        />
        <label
          htmlFor="attachment"
          className="cursor-pointer border border-blue-400 text-white rounded-lg p-2 hover:bg-lamaskyLight transition hover:border-none hover:shadow-sm shadow-blue-600"
        >
          📎
        </label>

        {/* Button to add pictures */}
        <button
          type="button"
          onClick={() => document.getElementById("attachment")?.click()}
          className=" border-purple-400 text-white rounded-lg p-2 border hover:bg-lamaPurpleLight transition hover:border-none hover:shadow-lg shadow-purple-600  "
        >
          🖼️
        </button>

        <button
          type="submit"
          className=" bg-indigo-500 text-white rounded-lg p-2 hover:bg-indigo-400 transition-all"
        >
          Send
        </button>
      </form>

      {/* Show the emoji picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full mb-2">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* Show the current attachment if exists */}
      {attachment && (
        <div className="mt-2 flex items-center">
          <span className="text-gray-600">Attached: {attachment.name}</span>
          <button
            type="button"
            onClick={handleRemoveAttachment}
            className="ml-2 text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
