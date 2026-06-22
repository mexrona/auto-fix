export type MessageRole = "user" | "bot";

export type BookingStep =
  | "idle"
  | "name"
  | "phone"
  | "car"
  | "service"
  | "comment"
  | "confirm";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

export interface BookingData {
  name: string;
  phone: string;
  car: string;
  service: string;
  comment: string;
}

export interface BookingRequest extends BookingData {
  id: string;
  createdAt: string;
}

export interface ChatContext {
  bookingStep: BookingStep;
  bookingData: Partial<BookingData>;
}

export interface BotResponse {
  message: string;
  quickReplies?: QuickReply[];
  context?: Partial<ChatContext>;
  skipDelay?: boolean;
}

export const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { id: "prices", label: "Узнать цены", value: "Узнать цены" },
  { id: "service", label: "Подобрать услугу", value: "Подобрать услугу" },
  { id: "booking", label: "Записаться", value: "Записаться" },
  { id: "contacts", label: "Контакты", value: "Контакты" },
];

export const WELCOME_MESSAGE =
  "Здравствуйте! Я виртуальный помощник AutoFix 🚗\n\nПомогу подобрать услугу и записаться на обслуживание.";

export const EMPTY_BOOKING_DATA: BookingData = {
  name: "",
  phone: "",
  car: "",
  service: "",
  comment: "",
};
