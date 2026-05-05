import OpenAI from 'openai'
import { cookies } from 'next/headers'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (token !== process.env.AUTH_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages }: { messages: Message[] } = await req.json()

  // ビルド時に実行されないようハンドラー内で初期化
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    stream: true,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content) {
          controller.enqueue(encoder.encode(content))
        }
      }
      controller.close()
    },
    async cancel() {
      await stream.controller.abort()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}
