import { useCallback, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { getMessagesbyChannel } from "@/lib/service-data";
import {
  getDirectChannelId,
  getGroupChannelId,
  isDirectMessage,
  isGroupChat,
} from "@/lib/helpers";
import { Contact, GroupChat } from "@/components/chats/MessageInput";

type UseMessagesProps = {
  selectedContact: Contact | GroupChat | null;
  userId: string;
};
type TypingStatusData = {
  userId: string;
  typing: boolean;
};

const useMessages = ({ selectedContact, userId }: UseMessagesProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [classMessages, setClassMessages] = useState<TMessage[]>([]);
  const [privateMessages, setPrivateMessages] = useState<TMessage[]>([]);

  const fetchMessages = useCallback(
    async (channel: string, type: "group" | "direct") => {
      const messages = await getMessagesbyChannel(channel);
      if (type === "group") setClassMessages(messages);
      if (type === "direct") setPrivateMessages(messages);
    },
    []
  );

  const subscribeToChannel = useCallback(
    (channelName: string) => {
      pusherClient.subscribe(channelName);

      pusherClient.bind("upcoming-message", (data: TMessage) => {
        if (isDirectMessage(data.channel))
          setPrivateMessages((prev) => [...prev, data]);
        if (isGroupChat(data.channel))
          setClassMessages((prev) => [...prev, data]);
      });

      pusherClient.bind("typing-status", (data: TypingStatusData) => {
        const { userId: senderId, typing } = data;
        if (senderId !== userId) setIsTyping(typing);
      });
    },
    [userId]
  );

  useEffect(() => {
    if (!selectedContact || !userId) return;

    let channelName = "";

    if ("classId" in selectedContact) {
      channelName = getGroupChannelId(selectedContact.classId);
      fetchMessages(channelName, "group");
    } else {
      channelName = getDirectChannelId(selectedContact._id as string, userId);
      fetchMessages(channelName, "direct");
    }

    subscribeToChannel(channelName);

    return () => {
      pusherClient.unsubscribe(channelName);
      pusherClient.unbind("upcoming-message");
      pusherClient.unbind("typing-status");
    };
  }, [selectedContact, userId, subscribeToChannel, fetchMessages]);

  return { isTyping, classMessages, privateMessages };
};

export default useMessages;
