import { BOOKING_SERVICES, PRICES, SITE } from "@/lib/data";
import type {
  BookingData,
  BookingRequest,
  BookingStep,
  BotResponse,
  ChatContext,
  QuickReply,
} from "@/types/chat";
import { EMPTY_BOOKING_DATA, INITIAL_QUICK_REPLIES } from "@/types/chat";

const STORAGE_KEY = "autofix-chat-bookings";

interface FaqEntry {
  keywords: string[];
  response: string;
}

const FAQ_DICTIONARY: FaqEntry[] = [
  {
    keywords: ["замена масла", "масло", "моторное масло"],
    response:
      "🛢 **Замена масла** — одна из наших ключевых услуг.\n\nМы выполняем замену моторного и трансмиссионного масла с проверкой всех уровней жидкостей. Используем качественные масла и фильтры, подходящие для вашего автомобиля.\n\n💰 Стоимость: от 2 500 ₽ (мотор + фильтр)\n⏱ Время: 30–45 минут\n\nХотите записаться на замену масла?",
  },
  {
    keywords: ["шиномонтаж", "шины", "колёса", "колеса", "балансировка"],
    response:
      "🛞 **Шиномонтаж** выполняем на современном оборудовании.\n\n• Сезонная замена шин\n• Балансировка колёс\n• Ремонт проколов\n• Проверка давления\n\n💰 Стоимость: от 3 200 ₽ (4 колеса)\n⏱ Время: 40–60 минут\n\nЗапишитесь заранее — в сезон очередь может быть дольше обычного.",
  },
  {
    keywords: ["диагностика", "проверка", "осмотр"],
    response:
      "🔍 **Диагностика** — комплексная проверка всех систем автомобиля.\n\n• Визуальный осмотр\n• Проверка ходовой части\n• Тестирование узлов и агрегатов\n• Подробный отчёт для владельца\n\n💰 Стоимость: от 1 500 ₽\n⏱ Время: 30–60 минут\n\nПосле диагностики вы получите понятную смету — ремонт начинается только с вашего согласия.",
  },
  {
    keywords: ["компьютерная диагностика", "сканер", "ошибки", "эбу", "check engine"],
    response:
      "💻 **Компьютерная диагностика** — считывание ошибок и анализ параметров ЭБУ.\n\n• Сканирование всех блоков управления\n• Расшифровка кодов ошибок\n• Анализ параметров в реальном времени\n• Рекомендации по устранению\n\n💰 Стоимость: от 1 200 ₽\n⏱ Время: 20–40 минут",
  },
  {
    keywords: ["подвеск", "амортизатор", "рычаг", "сайлентблок", "стук"],
    response:
      "🔧 **Ремонт подвески** — устранение стуков, люфтов и износа.\n\n• Замена амортизаторов и пружин\n• Рычаги и сайлентблоки\n• Ступичные подшипники\n• Шаровые опоры\n\nМастер покажет изношенные детали и согласует работы до начала ремонта. Гарантия на выполненные работы — до 12 месяцев.",
  },
  {
    keywords: ["тормоз", "колодк", "диск"],
    response:
      "🛑 **Ремонт тормозной системы** — безопасность прежде всего.\n\n• Замена тормозных колодок\n• Замена тормозных дисков\n• Прокачка тормозной системы\n• Диагностика ABS\n\n💰 Замена колодок (передняя ось): от 2 800 ₽\n\nРекомендуем проверять тормоза каждые 15 000–20 000 км.",
  },
  {
    keywords: ["то", "техобслуживание", "техническое обслуживание", "плановое"],
    response:
      "⚙️ **Техническое обслуживание (ТО)** по регламенту производителя.\n\n• Замена масла и фильтров\n• Проверка тормозной системы\n• Диагностика подвески\n• Проверка жидкостей и ремней\n\n💰 Базовый пакет ТО: от 5 900 ₽\n⏱ Время: 2–3 часа\n\nПлановое ТО помогает избежать дорогостоящего ремонта в будущем.",
  },
  {
    keywords: ["развал", "схождение", "углы колёс", "углы колес"],
    response:
      "📐 **Развал-схождение** — точная настройка углов установки колёс.\n\n• Уменьшает износ шин\n• Улучшает управляемость\n• Снижает расход топлива\n\n💰 Стоимость: от 2 400 ₽\n⏱ Время: 40–60 минут\n\nРекомендуем делать после замены деталей подвески или при неравномерном износе шин.",
  },
  {
    keywords: ["свеч", "зажиган"],
    response:
      "⚡ **Замена свечей зажигания** — важная процедура для стабильной работы двигателя.\n\n• Улучшает запуск двигателя\n• Снижает расход топлива\n• Предотвращает пропуски зажигания\n\n💰 Стоимость: от 1 800 ₽\n⏱ Время: 30–45 минут",
  },
  {
    keywords: ["цена", "цены", "прайс", "стоимость", "сколько стоит", "узнать цены"],
    response: buildPricesResponse(),
  },
  {
    keywords: ["контакт", "адрес", "телефон", "где вы", "как добраться"],
    response: buildContactsResponse(),
  },
  {
    keywords: ["гарант"],
    response:
      "🛡 **Гарантия на работы** — до 12 месяцев.\n\nМы официально оформляем гарантию на все выполненные работы и установленные запчасти. Если возникнут вопросы после ремонта — обращайтесь, мы всё исправим.",
  },
  {
    keywords: ["аккумулятор", "акб", "батаре"],
    response:
      "🔋 **Обслуживание аккумулятора** и электрооборудования.\n\n• Проверка зарядки АКБ\n• Замена аккумулятора\n• Диагностика стартера и генератора\n• Проверка контактов\n\nПриходите на бесплатную проверку аккумулятора перед зимой или дальней поездкой.",
  },
  {
    keywords: ["кондиционер", "климат", "фреон"],
    response:
      "❄️ **Обслуживание кондиционера** — заправка, диагностика, чистка.\n\n• Проверка герметичности системы\n• Заправка фреоном\n• Замена салонного фильтра\n• Устранение неприятных запахов\n\nРекомендуем обслуживать кондиционер раз в год — до начала жаркого сезона.",
  },
  {
    keywords: ["двигатель", "мотор", "капремонт"],
    response:
      "🏎 **Ремонт двигателя** — от текущего обслуживания до капитального ремонта.\n\n• Диагностика неисправностей\n• Замена ремней и цепей ГРМ\n• Ремонт системы охлаждения\n• Устранение течей масла\n\nНачинаем с комплексной диагностики — мастер покажет проблему и предложит оптимальное решение.",
  },
  {
    keywords: ["режим", "график", "время работы", "когда работаете", "выходные"],
    response: `🕐 **Режим работы AutoFix:**\n\n${SITE.hours}\n\nЗапись доступна онлайн круглосуточно — менеджер подтвердит визит в рабочее время.`,
  },
  {
    keywords: ["подобрать услугу", "какую услугу", "что выбрать", "помогите выбрать"],
    response: buildServicePickerResponse(),
  },
  {
    keywords: ["запис", "заявк", "запишите"],
    response:
      "📅 Отлично! Давайте оформим запись на обслуживание.\n\nЯ задам несколько вопросов — это займёт пару минут.",
  },
];

const SERVICE_QUICK_REPLIES: QuickReply[] = BOOKING_SERVICES.filter(
  (s) => s !== "Другое",
).map((service) => ({
  id: service.toLowerCase().replace(/\s+/g, "-"),
  label: service,
  value: service,
}));

function buildPricesResponse(): string {
  const priceList = PRICES.map((p) => `• ${p.service} — **${p.price}**`).join("\n");
  return `💰 **Актуальные цены AutoFix:**\n\n${priceList}\n\nТочная стоимость зависит от марки автомобиля и объёма работ. Хотите записаться на бесплатную консультацию?`;
}

function buildContactsResponse(): string {
  return `📍 **Контакты AutoFix:**\n\n📞 Телефон: ${SITE.phone}\n📧 Email: ${SITE.email}\n🏠 Адрес: ${SITE.address}\n🕐 ${SITE.hours}\n\nЗвоните или оставьте заявку — перезвоним в течение 15 минут в рабочее время.`;
}

function buildServicePickerResponse(): string {
  const services = BOOKING_SERVICES.filter((s) => s !== "Другое")
    .map((s) => `• ${s}`)
    .join("\n");
  return `🔧 **Наши услуги:**\n\n${services}\n\nОпишите симптомы или выберите услугу — я подскажу подробнее. Например: «замена масла», «диагностика» или «шиномонтаж».`;
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

export function matchFaq(text: string): string | null {
  const normalized = normalizeText(text);

  for (const entry of FAQ_DICTIONARY) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.response;
    }
  }

  return null;
}

export function getResponseDelay(): number {
  return 1000 + Math.random() * 1000;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function saveBookingRequest(data: BookingData): BookingRequest {
  const request: BookingRequest = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const existing = getBookingRequests();
    existing.push(request);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  return request;
}

export function getBookingRequests(): BookingRequest[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookingRequest[]) : [];
  } catch {
    return [];
  }
}

function formatBookingSummary(data: BookingData): string {
  return (
    "📋 **Проверьте данные заявки:**\n\n" +
    `👤 Имя: **${data.name}**\n` +
    `📞 Телефон: **${data.phone}**\n` +
    `🚗 Автомобиль: **${data.car}**\n` +
    `🔧 Услуга: **${data.service}**` +
    (data.comment ? `\n💬 Комментарий: ${data.comment}` : "")
  );
}

const BOOKING_PROMPTS: Record<Exclude<BookingStep, "idle" | "confirm">, string> = {
  name: "Как вас зовут?",
  phone: "Укажите номер телефона для связи:",
  car: "Какая марка и модель автомобиля?",
  service: "Какая услуга вам нужна? Выберите из списка или напишите:",
  comment: "Есть комментарий или пожелания? (можно написать «нет» или «-»)",
};

export function processQuickReply(
  value: string,
  context: ChatContext,
): BotResponse | null {
  if (context.bookingStep === "confirm") {
    if (value === "Отправить заявку" && isBookingComplete(context.bookingData)) {
      saveBookingRequest(context.bookingData as BookingData);
      return {
        message:
          "✅ Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.",
        context: {
          bookingStep: "idle",
          bookingData: { ...EMPTY_BOOKING_DATA },
        },
        quickReplies: INITIAL_QUICK_REPLIES,
      };
    }
    if (value === "Изменить данные") {
      return {
        message: "Хорошо, начнём заново. Как вас зовут?",
        context: {
          bookingStep: "name",
          bookingData: { ...EMPTY_BOOKING_DATA },
        },
      };
    }
    return null;
  }

  if (context.bookingStep !== "idle") return null;

  switch (value) {
    case "Узнать цены":
      return {
        message: buildPricesResponse(),
        quickReplies: [
          { id: "booking", label: "Записаться", value: "Записаться" },
          ...INITIAL_QUICK_REPLIES.filter((r) => r.id !== "prices"),
        ],
      };
    case "Подобрать услугу":
      return {
        message: buildServicePickerResponse(),
        quickReplies: SERVICE_QUICK_REPLIES.slice(0, 4),
      };
    case "Записаться":
      return startBookingFlow();
    case "Контакты":
      return {
        message: buildContactsResponse(),
        quickReplies: [
          { id: "booking", label: "Записаться", value: "Записаться" },
          { id: "prices", label: "Узнать цены", value: "Узнать цены" },
        ],
      };
    default:
      return null;
  }
}

function startBookingFlow(): BotResponse {
  return {
    message: "📅 **Запись на обслуживание**\n\n" + BOOKING_PROMPTS.name,
    context: {
      bookingStep: "name",
      bookingData: { ...EMPTY_BOOKING_DATA },
    },
  };
}

function isBookingComplete(data: Partial<BookingData>): data is BookingData {
  return Boolean(data.name && data.phone && data.car && data.service);
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

export function processBookingInput(
  text: string,
  context: ChatContext,
): BotResponse | null {
  const step = context.bookingStep;
  if (step === "idle" || step === "confirm") return null;

  const data = { ...context.bookingData };

  switch (step) {
    case "name": {
      const name = text.trim();
      if (name.length < 2) {
        return { message: "Пожалуйста, укажите ваше имя (минимум 2 символа)." };
      }
      data.name = name;
      return {
        message: `Приятно познакомиться, ${name}! ${BOOKING_PROMPTS.phone}`,
        context: { bookingStep: "phone", bookingData: data },
      };
    }
    case "phone": {
      if (!validatePhone(text)) {
        return {
          message: "Укажите корректный номер телефона, например: +7 (999) 123-45-67",
        };
      }
      data.phone = text.trim();
      return {
        message: BOOKING_PROMPTS.car,
        context: { bookingStep: "car", bookingData: data },
      };
    }
    case "car": {
      const car = text.trim();
      if (car.length < 2) {
        return { message: "Укажите марку и модель автомобиля, например: Toyota Camry" };
      }
      data.car = car;
      return {
        message: BOOKING_PROMPTS.service,
        context: { bookingStep: "service", bookingData: data },
        quickReplies: SERVICE_QUICK_REPLIES,
      };
    }
    case "service": {
      data.service = text.trim();
      return {
        message: BOOKING_PROMPTS.comment,
        context: { bookingStep: "comment", bookingData: data },
      };
    }
    case "comment": {
      const comment = text.trim();
      data.comment = comment === "-" || comment.toLowerCase() === "нет" ? "" : comment;
      return {
        message: formatBookingSummary(data as BookingData),
        context: { bookingStep: "confirm", bookingData: data },
        quickReplies: [
          { id: "submit", label: "Отправить заявку", value: "Отправить заявку" },
          { id: "edit", label: "Изменить данные", value: "Изменить данные" },
        ],
      };
    }
    default:
      return null;
  }
}

export async function processUserMessage(
  text: string,
  context: ChatContext,
): Promise<BotResponse> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { message: "Напишите ваш вопрос — я с радостью помогу!" };
  }

  if (trimmed === "Записаться" && context.bookingStep === "idle") {
    return startBookingFlow();
  }

  const quickReplyResponse = processQuickReply(trimmed, context);
  if (quickReplyResponse) {
    return quickReplyResponse;
  }

  if (context.bookingStep !== "idle" && context.bookingStep !== "confirm") {
    const bookingResponse = processBookingInput(trimmed, context);
    if (bookingResponse) return bookingResponse;
  }

  const faqResponse = matchFaq(trimmed);
  if (faqResponse) {
    return {
      message: faqResponse,
      quickReplies: [
        { id: "booking", label: "Записаться", value: "Записаться" },
        { id: "prices", label: "Узнать цены", value: "Узнать цены" },
      ],
    };
  }

  return {
    message:
      "К сожалению, я не нашёл точного ответа на ваш вопрос. Попробуйте переформулировать или выберите одну из подсказок ниже.\n\nВы также можете позвонить нам: " +
      SITE.phone,
    quickReplies: INITIAL_QUICK_REPLIES,
  };
}
