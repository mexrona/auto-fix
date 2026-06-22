"use client";

import type { QuickReply } from "@/types/chat";

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ replies, onSelect, disabled }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply.value)}
          className="rounded-full border border-accent/30 bg-white px-3.5 py-1.5 text-xs font-medium text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
