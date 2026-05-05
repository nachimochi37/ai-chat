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
    <div className="flex items-end gap-2 mb-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
        AI
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
        <span className="inline-flex gap-1 items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
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
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.length === 0 && (
        <p className="text-center text-gray-400 mt-12 text-sm">
          メッセージを送ってみよう！
        </p>
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
