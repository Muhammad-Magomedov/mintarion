import type { IMessage, MessageSenderRoleType } from "@/shared/types/entities/message";

export interface IMessageHistory {
  role: MessageSenderRoleType;
  content: string;
  createdAt: string | number;
}

export interface IGetMessagesHistoryResponse {
  history: {
    threadId: string;
    messages: IMessageHistory[];
  };
}

export interface UseMessageHistoryOptions {
  enabled?: boolean;
  staleTime?: number;
}

export interface UseStreamingChatOptions {
  onUserMessage?: (message: IMessage) => void;
  onAIMessageStart?: (message: IMessage) => void;
  onAIMessageChunk?: (messageId: string, chunk: string, fullText: string) => void;
  onAIMessageComplete?: (message: IMessage) => void;
  onError?: (error: any, messageId: string | null) => void;
}