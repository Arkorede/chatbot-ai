import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import ReactMarkdown from "react-markdown";
import Loader from "./loader";

interface ChatMessageProps {
  isUser: boolean;
  content: string;
  markdown?: boolean;
  isError?: boolean;
  timestamp?: string;
  isLoading?: boolean;
}

const ChatMessage = ({
  isUser,
  markdown,
  content,
  isError,
  timestamp,
  isLoading,
}: ChatMessageProps) => {
  return (
    <div
      className={`flex w-full mb-4 gap-2 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
      aria-label={isUser ? "User message" : "AI message"}
    >
      <Avatar className="flex items-center justify-center h-8 w-8 shrink-0 bg-[#4b5563]">
        <AvatarFallback className="text-[12px] font-semibold text-white">
          <span>{isUser ? "U" : "AI"}</span>
        </AvatarFallback>
      </Avatar>

      <Card
        className={`px-3 pt-1 pb-2 gap-2 max-w-[75%] rounded-md text-sm leading-relaxed whitespace-pre-wrap break-words border-black ${
          isUser
            ? "bg-[#2F2F2F] text-white"
            : `${
                isError
                  ? "bg-[#2F2F2F] text-red-400"
                  : "bg-[#128C7E] text-white"
              }`
        }`}
      >
        {markdown ? (
          <ReactMarkdown
            components={{
              code: ({ children, ...props }) => {
                const isInline = !props.className;
                return (
                  <code
                    className={`rounded bg-black/40 px-1.5 py-0.5 text-[0.8rem] font-mono ${
                      isInline ? "" : "block mt-2 mb-2 p-3"
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              a: ({ children, ...props }) => (
                <a
                  className="underline underline-offset-2 text-blue-400 hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-400 pl-2 italic text-gray-300 my-2"
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside my-2 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol
                  className="list-decimal list-inside my-2 space-y-1"
                  {...props}
                >
                  {children}
                </ol>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p>{isLoading ? <Loader /> : content}</p>
        )}

        {timestamp && (
          <div className="text-[8px] text-end text-white opacity-70">
            {timestamp}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatMessage;
