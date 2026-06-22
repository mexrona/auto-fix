"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

function renderContent(content: string) {
  const parts = content.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part.split("\n").map((line, lineIndex, arr) => (
      <span key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex animate-chat-message-in ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
          aria-hidden
        >
          AF
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-md bg-accent text-white"
            : "rounded-bl-md bg-zinc-100 text-zinc-800"
        }`}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
