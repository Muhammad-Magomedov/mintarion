import { NextRequest, NextResponse } from 'next/server';
import { envConfig } from '@/shared/config/env';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const userId = formData.get('userId') as string;
    const message = formData.get('message') as string;
    const image = formData.get('image') as File | null;

    // console.log('Received data:', { userId, message, hasImage: !!image });

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'userId and message are required' },
        { status: 400 }
      );
    }

    const externalUrl = `${envConfig.EXTERNAL_API_URL}/gpt`;
    // console.log('Sending to:', externalUrl);

    // Используем form-data для Node.js
    const externalFormData = new FormData();
    externalFormData.append('userId', userId);
    externalFormData.append('message', message);
    
    if (image) {
      // console.log('Image info:', {
      //   name: image.name,
      //   type: image.type,
      //   size: image.size
      // });
      
      const buffer = Buffer.from(await image.arrayBuffer());
      externalFormData.append('image', buffer, {
        filename: image.name || 'image.jpg',
        contentType: image.type || 'image/jpeg',
      });
    }

    try {
      // axios лучше обрабатывает некорректные заголовки
      const response = await axios.post(externalUrl, externalFormData, {
        headers: {
          ...externalFormData.getHeaders(),
        },
        responseType: 'stream',
        maxRedirects: 5,
        // Игнорируем некоторые HTTP ошибки
        validateStatus: (status) => status < 600,
      });
      
      console.log('External API response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.status >= 400) {
        // Читаем тело ответа для ошибки
        let errorText = '';
        for await (const chunk of response.data) {
          errorText += chunk.toString();
        }
        
        console.error('External API error response:', errorText);
        
        return NextResponse.json(
          { 
            error: `External service error: ${response.status}`,
            details: errorText 
          },
          { status: response.status }
        );
      }

      if (!response.data) {
        return NextResponse.json(
          { error: 'No response body from external service' },
          { status: 500 }
        );
      }

      // Проксируем стриминговый ответ из axios stream
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response.data) {
              controller.enqueue(chunk);
            }
            controller.close();
          } catch (error) {
            console.error('Streaming error:', error);
            controller.error(error);
          }
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });

    } catch (axiosError: any) {
      console.error('Axios error:', axiosError.message);
      
      // Попытка извлечь данные из ошибки
      if (axiosError.response) {
        const errorText = axiosError.response.data?.toString() || 'Unknown error';
        return NextResponse.json(
          { 
            error: `Backend error: ${axiosError.response.status}`,
            details: errorText 
          },
          { status: axiosError.response.status }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to connect to backend',
          details: axiosError.message,
          hint: 'Backend server may have protocol issues'
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('API Route error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Error details:', { message: errorMessage, stack: errorStack });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}


/**
 * 
 * import { NextRequest, NextResponse } from "next/server";
import { aiConfig } from "@/shared/config/ai";
import { envConfig } from "@/shared/config/env";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const formData = await request.formData();
    const message = formData.get('message') as string;
    const userId = formData.get('userId') as string;
    const image = formData.get('image') as File | null;

    if (!message || !userId) {
      return NextResponse.json(
        { error: "userId and message are required" },
        { status: 400 }
      );
    }

    const externalFormData = new FormData();
    externalFormData.append('message', message);
    externalFormData.append('userId', userId);
    
    if (image) {
      if (image.size > 100 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size must be less than 100MB" },
          { status: 400 }
        );
      }

      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      externalFormData.append('image', image);
    }

    const url = `${envConfig.EXTERNAL_API_URL}/api/gpt`;

    const response = await fetch(url, {
      method: "POST",
      body: externalFormData,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body from backend");
    }

    let isFirstChunk = true;
    let imageUrlFromServer: string | null = null;

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            const text = decoder.decode(value, { stream: true });
            
            if (isFirstChunk && image) {
              try {
                const lines = text.split('\n');
                const firstLine = lines[0];
                if (firstLine.startsWith('{') && firstLine.includes('imageUrl')) {
                  const metadata = JSON.parse(firstLine);
                  imageUrlFromServer = metadata.imageUrl;
                  controller.enqueue(new TextEncoder().encode(firstLine + '\n'));
                  const restText = lines.slice(1).join('\n');
                  if (restText) {
                    controller.enqueue(new TextEncoder().encode(restText));
                  }
                  isFirstChunk = false;
                  continue;
                }
              } catch (e) {
              }
            }
            
            isFirstChunk = false;
            controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error: any) {
    console.error("Error in AI route:", error);
    
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
*/