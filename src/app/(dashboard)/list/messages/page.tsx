"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ClassChat from "@/components/chats/ClassChat";
import ContactList from "@/components/chats/ContactList";
import MessageInput, {
  Contact,
  GroupChat,
} from "@/components/chats/MessageInput";
import PrivateChat from "@/components/chats/PrivateChat";
import useMessages from "@/hooks/useMessageProps";

const MessagesPage: React.FC = () => {
  const { data: session } = useSession();
  const [selectedContact, setSelectedContact] = useState<
    Contact | GroupChat | null
  >(null);

  const { isTyping, classMessages, privateMessages } = useMessages({
    selectedContact,
    userId: session?.user.id as string,
  });

  return (
    <div className="flex h-screen w-full">
      {/* Contact List */}
      <div className="sm:w-1/6 md:w-1/4 bg-gray-100 border-r">
        <ContactList onSelectContact={setSelectedContact} session={session} />
      </div>

      {/* Chat Box */}
      <div className="lg:w-full sm:w-5/6 md:w-3/4 flex flex-col">
        <div className="flex-grow overflow-hidden">
          {selectedContact ? (
            "classId" in selectedContact ? (
              <ClassChat
                messages={classMessages}
                selectedContact={selectedContact}
                sessionId={session?.user.id}
                isTyping={isTyping}
              />
            ) : (
              <PrivateChat
                messages={privateMessages}
                selectedContact={selectedContact}
                sessionId={session?.user.id}
                isTyping={isTyping}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Please choose a contact to start chatting
              </p>
            </div>
          )}
        </div>

        <MessageInput
          sessionId={session?.user.id}
          selectedContact={selectedContact}
          role={session?.user.role}
          name={session?.user.name}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
