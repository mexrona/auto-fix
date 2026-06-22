"use client";

import { MessageCircle, Minus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { QuickReplies } from "@/components/chat/QuickReplies";
import {
  delay,
  generateId,
  getResponseDelay,
  processUserMessage,
} from "@/services/chatbotService";
import type { ChatContext, ChatMessage as ChatMessageType, QuickReply } from "@/types/chat";
import {
  EMPTY_BOOKING_DATA,
  INITIAL_QUICK_REPLIES,
  WELCOME_MESSAGE,
} from "@/types/chat";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const INITIAL_CONTEXT: ChatContext = {
  bookingStep: "idle",
  bookingData: { ...EMPTY_BOOKING_DATA },
};

function TypingIndicator() {
  return (
    <div className="flex animate-chat-message-in justify-start">
      <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
        AF
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function ChatWindow({ isOpen, onClose, onMinimize }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(INITIAL_QUICK_REPLIES);
  const [context, setContext] = useState<ChatContext>(INITIAL_CONTEXT);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setMessages([
        {
          id: generateId(),
          role: "bot",
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
      setQuickReplies(INITIAL_QUICK_REPLIES);
      setHasInitialized(true);
    }
  }, [isOpen, hasInitialized]);

  const addBotMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: "bot",
        content,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleUserMessage = useCallback(
    async (text: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "user",
          content: text,
          timestamp: new Date(),
        },
      ]);
      setQuickReplies([]);
      setIsTyping(true);

      const currentContext = context;
      await delay(getResponseDelay());

      try {
        const response = await processUserMessage(text, currentContext);

        if (response.context) {
          setContext((prev) => ({
            bookingStep: response.context?.bookingStep ?? prev.bookingStep,
            bookingData: { ...prev.bookingData, ...response.context?.bookingData },
          }));
        }

        addBotMessage(response.message);
        setQuickReplies(response.quickReplies ?? []);
      } finally {
        setIsTyping(false);
      }
    },
    [context, addBotMessage],
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Чат с виртуальным помощником AutoFix"
      className="fixed inset-x-4 bottom-24 z-50 flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30 animate-chat-window-in sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px] md:w-[400px]"
    >
      <header className="flex items-center justify-between bg-graphite px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">AutoFix Помощник</h2>
            <p className="text-xs text-zinc-400">Обычно отвечает за минуту</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Свернуть чат"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть чат"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div
        ref={messagesContainerRef}
        className="flex-1 space-y-3 overflow-y-auto bg-white px-2 py-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="px-1">
            <TypingIndicator />
            <p className="mt-1 pl-10 text-xs text-zinc-400">Печатает...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <QuickReplies
        replies={quickReplies}
        onSelect={handleUserMessage}
        disabled={isTyping}
      />

      <ChatInput onSend={handleUserMessage} disabled={isTyping} />
    </div>
  );
}
