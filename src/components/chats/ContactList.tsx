import { FetchContactsList } from "@/lib/actionServer";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

type Contact = TTeacher | TStudent | TParent;

type GroupChat = {
  id: string;
  className: string;
  classId: string;
  classMembers: string[];
};
type ContactsData = {
  classChat: GroupChat[];
  contacts: Contact[];
};

const ContactList: React.FC<{
  onSelectContact: (contact: any) => void;
  session: Session | null;
}> = ({ onSelectContact, session }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groupChat, setGroupChat] = useState<GroupChat[]>([]);
  console.log(session);

  useEffect(() => {
    const data = async () => {
      const response = (await FetchContactsList(
        session?.user.role,
        session?.user.id
      )) as ContactsData | undefined;

      // Use optional chaining to safely access properties
      setContacts(response?.contacts ?? []);
      setGroupChat(response?.classChat ?? []);
    };
    data();
  }, [session?.user.role, session?.user.id]);

  return (
    <div>
      <h2 className="text-lg font-semibold p-4">Contacts</h2>
      <ul className="p-4">
        {/* Group Chat Entries */}
        {groupChat.map((group) => (
          <li
            key={group.classId}
            onClick={() => onSelectContact(group)}
            className="p-2 hover:bg-gray-300 cursor-pointer flex items-center"
          >
            <div className="mr-2 rounded-full bg-lamaYellow w-8 h-8 flex items-center justify-center text-gray-500">
              {group.className.charAt(0)}
            </div>
            <span className="hidden md:block">
              {group.className} - Class Chat
            </span>
          </li>
        ))}

        {/* Contacts List */}
        {contacts.map((contact) => (
          <li
            key={contact._id}
            onClick={() => onSelectContact(contact)}
            className="p-2 hover:bg-gray-300 cursor-pointer flex items-center"
          >
            <div className="mr-2 rounded-full bg-lamasky w-8 h-8 flex items-center justify-center text-gray-500">
              {/* Show first letter of the name */}
              <span className="hidden sm:block">{contact.name.charAt(0)}</span>
              <span className="block sm:hidden">{contact.name.charAt(0)}</span>
            </div>
            <span className="contact-name hidden md:block">
              {contact.name} {contact.surname}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
