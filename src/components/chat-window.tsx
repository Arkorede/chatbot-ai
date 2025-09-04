"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";

interface Message {
  id: string;
  isUser: boolean;
  content: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [persistedHistory, setPersistedHistory] = useState<Message[]>([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setPersistedHistory(parsed);
      } catch (error) {
        console.error("Failed to parse saved messages:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat-messages", JSON.stringify(messages));
      setPersistedHistory(messages);
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      isUser: true,
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const conversations = [...persistedHistory, userMessage];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversations,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: crypto.randomUUID(),
        isUser: false,
        content: data.reply,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending messsage", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        isUser: false,
        content: "Sorry, something went wrong. Please try again later",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <ScrollArea className="p-4 flex-1 h-full max-h-[90vh] overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            isUser={message.isUser}
            content={message.content}
            markdown={!message.isUser}
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
