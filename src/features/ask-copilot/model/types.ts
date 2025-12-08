export interface ICopilotChat {
  isOpen: boolean;
  userMessage?: string;
  meta?: {
    refferer?: {
      text?: string;
    };
    imgSrc?: string;
    tags: string[];
    title?: string;
    source?: string;
    createdAt?: string;
  };
}

export interface ICopilot {
  chat: ICopilotChat;
}