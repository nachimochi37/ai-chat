'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ChatWindow from '@/components/ChatWindow'
import ChatInput from '@/components/ChatInput'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'chat_history'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setMessages(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const saveToStorage = (msgs: Message[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
  }

  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content }
    const nextMessages = [...messages, userMessage]

    setMessages([...nextMessages, { role: 'assistant', content: '' }])
    saveToStorage(nextMessages)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!res.ok || !res.body) throw new Error('API error')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantContent += decoder.decode(value, { stream: true })
        setMessages([...nextMessages, { role: 'assistant', content: assistantContent }])
      }

      const finalMessages: Message[] = [...nextMessages, { role: 'assistant', content: assistantContent }]
      saveToStorage(finalMessages)
    } catch {
      setMessages(nextMessages)
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const handleReset = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/')
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
        <h1 className="text-lg font-bold text-gray-800">AIチャット</h1>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            disabled={isLoading || messages.length === 0}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ログアウト
          </button>
        </div>
      </header>
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </main>
  )
}
