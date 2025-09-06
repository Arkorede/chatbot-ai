"use client";
import { ScrollArea } from "./ui/scroll-area";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { useChat } from "@/app/hooks/useChat";

export default function ChatWindow() {
  const { messages, isLoading, sendMessage, isError } = useChat();

  return (
    <div>
      <ScrollArea className="flex-1 p-4 h-full max-h-[90vh] overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            isUser={message.isUser}
            content={message.content}
            markdown={!message.isUser}
            isError={isError}
          />
        ))}
        {isLoading && (
          <ChatMessage isUser={false} content="Loading..." markdown={true} />
        )}
        {isLoading}
      </ScrollArea>
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
