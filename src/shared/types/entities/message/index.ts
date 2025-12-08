export type MessageSenderRoleType = "user" | "ai" | "assistant"

export interface IMessage {
  id: string;
  content: string;
  sender: MessageSenderRoleType;
  isLiked?: boolean;
  isDisliked?: boolean;
  timestamp: Date;
  isStreaming?: boolean;
  imageUrl?: string;
  metadata?: {
    previewUrl?: string;
    [key: string]: any;
  };
  createdAt?: number;
}