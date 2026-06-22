"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
      />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат с помощником"}
        aria-expanded={isOpen}
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/40 sm:right-6 sm:bottom-6"
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
            </span>
          </>
        )}
      </button>
    </>
  );
}
