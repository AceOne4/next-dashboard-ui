import React from "react";
import { GroupChat } from "./MessageInput";

const ClassChat: React.FC<{
  messages: TMessage[];
  selectedContact: GroupChat;
  sessionId: string;
  isTyping: boolean;
}> = ({ messages, selectedContact, sessionId, isTyping }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold">
        Class - {selectedContact.className}
      </h2>
      <div className="mt-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 ${msg.sender.id === sessionId ? "text-right" : ""}`}
          >
            <div>
              <span
                className={` hidden px-2 py-2 mr-2 rounded-full ${
                  msg.sender.id !== sessionId && "bg-lamaYellow"
                } `}
              >
                {msg.sender.name.charAt(0)}
              </span>
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender.id === sessionId
                    ? "bg-blue-500 text-white"
                    : "bg-yellow-500"
                }`}
              >
                {msg.content}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <p className="text-sm text-gray-500">
            {selectedContact?.id} is typing...
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassChat;
