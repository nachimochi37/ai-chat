'use client'

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Props = {
  messages: Message[]
  isLoading: boolean
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4 justify-start animate-fade-in-up">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-purple-400 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
        🤖
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-purple-100">
        <span className="inline-flex gap-1 items-center">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const lastMessage = messages[messages.length - 1]
  const showTypingIndicator =
    isLoading && lastMessage?.role === 'assistant' && lastMessage?.content === ''

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-pink-50 to-purple-50">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
          <div className="text-5xl">💬</div>
          <p className="text-sm font-semibold">メッセージを送ってみよう！</p>
        </div>
      )}
      {messages.map((msg, i) => {
        if (showTypingIndicator && i === messages.length - 1) return null
        return <MessageBubble key={i} message={msg} />
      })}
      {showTypingIndicator && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
