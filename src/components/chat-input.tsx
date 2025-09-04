import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2 p-4  border-t max-h-[10vh] text-white">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button
        className="bg-[#128C7E]"
        onClick={handleSendMessage}
        disabled={isLoading || !message.trim()}
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};

export default ChatInput;
