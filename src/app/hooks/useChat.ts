"use client";
import { useState, useEffect } from "react";
import { type Message } from "../api/chat/route";

export const useChat = () => {
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
    if (!message || !message.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      isUser: true,
      content: message,
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const validatedPersistedHistory = persistedHistory.filter(
        (msg) => msg && msg.content && msg.content.trim().length > 0
      );

      const conversations = [...validatedPersistedHistory, userMessage];

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

      if (!response.ok || !data.reply) {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          isUser: false,
          content: "Sorry, something went wrong. Please try again later",
          isError: true,
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        return;
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        isUser: false,
        content: data.reply,
        timestamp: Date.now(),
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

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
