"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  memo,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { RiShareForwardLine } from "react-icons/ri";
import {
  BiLike,
  BiSolidLike,
  BiDislike,
  BiSolidDislike,
  BiCopy,
} from "react-icons/bi";
import { ChevronDown, Paperclip, X } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { ArrowUp } from "lucide-react";
import { SubscriptionAccess } from "@/features/manage-subscription";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { getTimeAgoStr, copyHtmlText } from "@/shared/utils";
import { useUserStore } from "@/entities/user/model/store";
import { IMessage } from "@/shared/types/entities/message";
import { useAuth } from "@/shared/hooks/auth";
import { useMessagesHistory, useStreamingChat } from "@/entities/ai/model";
import { useCopilotStore } from "../../model";
import styles from "./styles.module.scss";

export interface ICopilotChatProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const MessageItem = memo(
  ({
    messageKey,
    message,
    onToggle,
    onCopy,
  }: {
    messageKey: string;
    message: IMessage;
    onToggle: (key: string, field: keyof IMessage) => void;
    onCopy: (content: string) => void;
  }) => {
    const {
      content,
      sender,
      isLiked,
      isDisliked,
      isStreaming,
      imageUrl,
      metadata,
    } = message;

    const displayImageUrl = imageUrl || metadata?.previewUrl;

    return (
      <div className={styles.messageWrapper}>
        <div
          className={cn(
            styles.message,
            sender === "user" && cn(styles.userMessage, "bg-linear-to-b from-[rgba(188,213,187,0.6)] to-[rgba(165,199,165,0.6)] dark:bg-[#222B24]")
          )}
        >
          {displayImageUrl && sender === "user" && (
            <div className="mb-2">
              <img
                src={displayImageUrl}
                alt="Attached image"
                className="max-w-xs max-h-64 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {sender === "ai" ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <Markdown>{content || "Typing..."}</Markdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>

        {sender === "ai" && !isStreaming && (
          <div className={cn(styles.messageActions, "dark:text-gray-400")}>
            <button
              type="button"
              onClick={() => onToggle(messageKey, "isLiked")}
              aria-label="Like message"
            >
              {isLiked ? (
                <BiSolidLike className="h-[1em] text-green-750 dark:text-gray-400" />
              ) : (
                <BiLike className="h-[1em] text-green-750 dark:text-gray-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onToggle(messageKey, "isDisliked")}
              aria-label="Dislike message"
            >
              {isDisliked ? (
                <BiSolidDislike className="h-[1em] text-green-750 dark:text-gray-400" />
              ) : (
                <BiDislike className="h-[1em] text-green-750 dark:text-gray-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onCopy(content)}
              aria-label="Copy message"
            >
              <BiCopy className="h-[1em] text-green-750 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";

export const AiMessage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.aiMessage,
        styles.headerContentCenter,
        className,
        "border-b-[1px] border-solid dark:border-b-gray-650"
      )}
      {...props}
    >
      <b className="text-[1.1em]">
        Hi! I’m the crypto market{" "}
        <span className="text-[#558F54]">AI copilot</span> from Mintarion!
        <br />
      </b>
      <div>
        <p>
          I’ll break down the chart, key levels, and scenarios. Enter a ticker
          (e.g., BTC/USDT) or upload a screenshot — I’ll return a setup with
          triggers, invalidations, and targets.
          <br />
        </p>
        <p className="mt-1 text-[#969696]">
          I only answer questions related to the crypto market and charts.
        </p>
      </div>
      <div className="flex-col">
        <span className="text-[#558F54]">Quick start:</span>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>Create a BTC/USDT long setup on the 4h timeframe</li>
          <li>Analyze ETH/USDT: trend, levels, scenarios</li>
          <li>Explain RSI in simple terms</li>
        </ul>
      </div>
    </div>
  );
};

export const CopilotChat: React.FC<ICopilotChatProps> = ({
  className = "",
  ...props
}) => {
  const { session, user, userProfile } = useAuth();
  const { data: messageHistoryData } = useMessagesHistory(user?.id || "");
  const { chat, updateValue } = useCopilotStore();
  const { meta } = chat;
  const bodyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isChatHistoryUpdated, setIsChatHistoryUpdated] =
    useState<boolean>(false);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const currentAiTypingMessageIdRef = useRef<string | null>(null);
  const [userId, setUserId] = useState(uuidv4());
  const [userMessage, setUserMessage] = useState<string>(
    chat?.userMessage ?? ""
  );
  const [messageListData, setMessageListData] = useState<
    Record<string, IMessage>
  >({});

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const { sendMessage, isLoading, cancelRequest } = useStreamingChat({
    onUserMessage: (userMessage) => {
      setUserMessage("");
      const messageKey = userMessage.timestamp.getTime().toString();

      setMessageListData((prev) => ({
        ...prev,
        [messageKey]: userMessage,
      }));
    },

    onAIMessageStart: (aiMessage) => {
      setIsAiTyping(true);
      currentAiTypingMessageIdRef.current = aiMessage.id;
      setMessageListData((prev) => ({
        ...prev,
        [aiMessage.id]: {
          ...aiMessage,
          content: "",
          isStreaming: true,
        },
      }));
    },

    onAIMessageChunk: (messageId, chunk, fullText) => {
      setMessageListData((prev) => {
        if (!prev[messageId]) return prev;

        return {
          ...prev,
          [messageId]: {
            ...prev[messageId],
            content: prev[messageId].content + chunk,
            isStreaming: true,
          },
        };
      });
    },

    onAIMessageComplete: (completedMessage) => {
      setIsAiTyping(false);

      setMessageListData((prev) => {
        const updatedData = { ...prev };

        if (
          currentAiTypingMessageIdRef.current &&
          updatedData[currentAiTypingMessageIdRef.current]
        ) {
          delete updatedData[currentAiTypingMessageIdRef.current];
        }

        updatedData[completedMessage.id] = {
          ...completedMessage,
          isStreaming: false,
        };

        return updatedData;
      });

      currentAiTypingMessageIdRef.current = null;
    },

    onError: (error) => {
      setIsAiTyping(false);

      setMessageListData((prev) => {
        const updatedData = { ...prev };

        if (
          currentAiTypingMessageIdRef.current &&
          updatedData[currentAiTypingMessageIdRef.current]
        ) {
          delete updatedData[currentAiTypingMessageIdRef.current];
        }

        updatedData[Date.now().toString()] = {
          id: `error_${Date.now()}`,
          content: "An error occurred while sending the message",
          sender: "ai",
          timestamp: new Date(),
        };

        return updatedData;
      });

      currentAiTypingMessageIdRef.current = null;
    },
  });

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messageListData]);

  useEffect(() => {
    setUserId(user?.id || uuidv4());
  }, [user]);

  useEffect(() => {
    if (chat?.userMessage) {
      setUserMessage(chat.userMessage);
    }
  }, [chat?.userMessage]);

  useEffect(() => {
    if (messageHistoryData?.history && !isChatHistoryUpdated) {
      const existMessageListData: Record<string, IMessage> = {};

      const existMessages: IMessage[] = messageHistoryData.history.messages
        .reverse()
        .map(({ role, content, createdAt }) => ({
          id: uuidv4(),
          content,
          sender: role === "assistant" ? "ai" : "user",
          isLiked: false,
          isDisliked: false,
          metadata: {},
          timestamp: new Date(+createdAt * 1000),
          isStreaming: false,
        }));

      existMessages.forEach((message) => {
        existMessageListData[message.timestamp.getTime().toString()] = message;
      });

      setMessageListData(existMessageListData);
      setIsChatHistoryUpdated(true);
    }
  }, [messageHistoryData, isChatHistoryUpdated]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleRemoveFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleSendUserMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!userMessage.trim() && !selectedFile) return;

      const fileToSend = selectedFile;
      const previewToSend = previewUrl;

      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      try {
        await sendMessage({
          userId,
          message: userMessage,
          file: fileToSend || undefined,
          previewUrl: previewToSend || undefined,
        });

        setUserMessage("");

        if (previewToSend) {
          URL.revokeObjectURL(previewToSend);
        }
      } catch (err) {
        console.error("Error during send message", err);
      }
    },
    [userMessage, userId, selectedFile, previewUrl, sendMessage]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const toggleMessageValue = useCallback(
    (key: string, field: keyof IMessage) => {
      setMessageListData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [field]: !prev[key][field],
        },
      }));
    },
    []
  );

  const handleCopy = useCallback((content: string) => {
    copyHtmlText(content);
    toast("Text copied");
  }, []);

  const sortedMessages = useMemo(
    () =>
      Object.entries(messageListData)
        .sort(([a], [b]) => Number(a) - Number(b))
        .filter(([, data]) => data.content.length > 0 || data.isStreaming),
    [messageListData]
  );

  return (
    <div
      className={cn(styles.wrapper, chat.isOpen && styles.active, className)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="p-8 rounded-lg">
            <p className="text-lg font-medium">Drop image here</p>
          </div>
        </div>
      )}

      <div
        className={cn(
          styles.content,
          "text-neutral-950 dark:text-white",
          "bg-linear-to-b from-[#E9F1E8] to-[#E5F1E5] dark:from-zinc-900 dark:to-neutral-900"
        )}
        {...props}
      >
        <div className={cn(styles.header)}>
          <div className={styles.headerBtnList}>
            <Button
              className={cn(
                styles.headerBtn,
                "border-[1px] border-solid hover:opacity-80 dark:border-green-800"
              )}
              variant="transparent"
              shape="square"
              onClick={() => updateValue("chat", { ...chat, isOpen: false })}
            >
              <RxCross2 className="text-green-750 dark:text-white" size={16} />
            </Button>
          </div>
          {meta ? (
            <div className={styles.headerContent}>
              <div className={styles.headerContentTop}>
                {meta?.imgSrc && (
                  <img
                    className={styles.headerImage}
                    src={meta.imgSrc}
                    alt=""
                  />
                )}
                {meta?.tags && (
                  <ul className={styles.headerTags}>
                    {meta.tags.map((tag) => (
                      <li
                        className={cn(
                          styles.headerTag,
                          "bg-gradient-to-b dark:from-[rgba(48,83,47,0.1)] dark:to-[rgba(149,251,149,0.1)] dark:border-green-800"
                        )}
                        key={tag}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.headerContentCenter}>
                {meta?.title && (
                  <h3 className={styles.headerTitle}>{meta.title}</h3>
                )}
              </div>
              <div
                className={cn(styles.headerContentBottom, "dark:text-gray-400")}
              >
                {meta.createdAt && <span>{getTimeAgoStr(meta.createdAt)}</span>}
                &nbsp;&bull;&nbsp;
                {meta.source && <span>{meta.source}</span>}
              </div>
            </div>
          ) : null}
        </div>
        {session ? (
          <>
            <div
              ref={bodyRef}
              className={styles.body}
              style={{ maxHeight: !meta ? "none" : "" }}
            >
              <AiMessage />
              {sortedMessages.map(([key, message]) => (
                <MessageItem
                  key={key}
                  messageKey={key}
                  message={message}
                  onToggle={toggleMessageValue}
                  onCopy={handleCopy}
                />
              ))}
            </div>
            <div className={styles.footer}>
              {meta?.refferer && (
                <div
                  className={cn(
                    styles.footerRow,
                    "dark:bg-[#19201B] dark:border-gray-650"
                  )}
                >
                  {meta.refferer?.text && (
                    <span className={styles.footerRowText}>
                      {meta.refferer.text}
                    </span>
                  )}
                  <button
                    className={cn(styles.footerRowBtn, "dark:text-green-600")}
                    type="button"
                  >
                    <span>+10 more</span>
                    <ChevronDown className="h-[1em]" />
                  </button>
                </div>
              )}

              {previewUrl && (
                <div className="px-4 py-2 dark:bg-[#19201B] border-t dark:border-gray-650">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-20 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}

              <form
                className={cn(
                  styles.footerForm,
                  "bg-green-20 border-[#C1C1C1] dark:bg-[#19201B] dark:border-gray-650"
                )}
                onSubmit={handleSendUserMessage}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0 p-2 rounded-lg transition-colors"
                >
                  <Paperclip
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </button>

                <Input
                  classNames={{ wrapper: cn(styles.footerFormInputWrapper, "from-transparent to-transparent dark:from-transparent dark:to-transparent") }}
                  className={cn(styles.footerFormInput, "placeholder:text-[#5B5B5B] !bg-transparent dark:!bg-transparent")}
                  placeholder="Ask any question..."
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
                <Button
                  className={cn(styles.footerFormBtn, "hover:opacity-80")}
                  variant="darkGreen"
                  shape="square"
                  type="submit"
                  disabled={isLoading || (!userMessage.trim() && !selectedFile)}
                >
                  <ArrowUp size={24} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <SubscriptionAccess />
        )}
      </div>
    </div>
  );
};
