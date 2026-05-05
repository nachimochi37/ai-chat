import Groq from 'groq-sdk'
import { cookies } from 'next/headers'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  if (token !== process.env.AUTH_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages }: { messages: Message[] } = await req.json()

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const stream = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages,
    stream: true,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) {
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()
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
