import { useState, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { baseInstance } from '@/shared/api/baseInstance';
import { envConfig } from '@/shared/config/env';
import { aiApi } from './api';
import type { IBaseMessageData } from '@/shared/types/entities/ai';
import type { IMessage } from '@/shared/types/entities/message';
import type { UseMessageHistoryOptions, UseStreamingChatOptions, IGetMessagesHistoryResponse } from "./types";

export const useMessagesHistory = (userId: string, options?: UseMessageHistoryOptions) => {
  return useQuery({
    queryKey: ["messageHistory", userId],
    queryFn: () => aiApi.getMessageHistory(userId),
    enabled: options?.enabled || !!userId,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  })
}

interface ISendMessagePayload extends IBaseMessageData {
  file?: File;
  previewUrl?: string;
}

export const useStreamingChat = (options: UseStreamingChatOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentAiMessageIdRef = useRef<string | null>(null);
  const queryClient = useQueryClient();

  const sendMessage = useCallback(async (payload: ISendMessagePayload) => {
    setIsLoading(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const userMessage: IMessage = {
        id: Date.now().toString(),
        content: payload.message,
        sender: 'user',
        timestamp: new Date(),
        isLiked: false,
        isDisliked: false,
        isStreaming: false,
        metadata: {
          previewUrl: payload.previewUrl,
        }
      };

      options.onUserMessage?.(userMessage);

      const aiMessageId = (Date.now() + 1).toString();
      currentAiMessageIdRef.current = aiMessageId;
      let fullAIText = '';

      const aiMessage: IMessage = {
        id: aiMessageId,
        content: '',
        sender: 'ai',
        timestamp: new Date(),
        isLiked: false,
        isDisliked: false,
        isStreaming: true,
      };

      options.onAIMessageStart?.(aiMessage);

      const formData = new FormData();
      formData.append('message', payload.message);
      formData.append('userId', payload.userId);
      
      if (payload.file) {
        formData.append('image', payload.file);
      }

      const response = await fetch(`/api/gpt`, {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let imageUrlFromServer: string | null = null;
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        if (isFirstChunk && payload.file) {
          try {
            const lines = chunk.split('\n');
            const firstLine = lines[0];
            if (firstLine.startsWith('{') && firstLine.includes('imageUrl')) {
              const metadata = JSON.parse(firstLine);
              imageUrlFromServer = metadata.imageUrl;
              
              if (imageUrlFromServer) {
                const updatedUserMessage = {
                  ...userMessage,
                  imageUrl: imageUrlFromServer,
                };
                options.onUserMessage?.(updatedUserMessage);
              }
              
              const restChunk = lines.slice(1).join('\n');
              if (restChunk) {
                fullAIText += restChunk;
                options.onAIMessageChunk?.(aiMessageId, restChunk, fullAIText);
              }
              isFirstChunk = false;
              continue;
            }
          } catch (e) {
          }
        }
        
        isFirstChunk = false;
        fullAIText += chunk;
        options.onAIMessageChunk?.(aiMessageId, chunk, fullAIText);
      }

      const completedMessage: IMessage = {
        id: aiMessageId,
        content: fullAIText,
        sender: 'ai',
        timestamp: new Date(),
        isLiked: false,
        isDisliked: false,
        isStreaming: false,
      };

      options.onAIMessageComplete?.(completedMessage);

      queryClient.invalidateQueries({ queryKey: ['messageHistory'] });

      currentAiMessageIdRef.current = null;
      setIsLoading(false);
      return completedMessage;

    } catch (err: any) {
      if (err.name === 'AbortError') {
        // console.log('Request aborted');
      } else {
        setError(err);
        options.onError?.(err, currentAiMessageIdRef.current);
        console.error('Message sending error:', err);
      }
      currentAiMessageIdRef.current = null;
      setIsLoading(false);
      throw err;
    }
  }, [options, queryClient]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
    cancelRequest,
  };
};