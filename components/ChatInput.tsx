'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
  onSend: (message: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value])

  const handleSend = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-pink-100 bg-white px-4 py-3">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="メッセージを入力... (Shift+Enterで改行)"
          className="flex-1 resize-none rounded-full border-2 border-pink-200 px-5 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 disabled:opacity-50 max-h-[120px] overflow-y-auto transition-all"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 text-white flex items-center justify-center hover:from-pink-500 hover:to-violet-600 disabled:opacity-40 transition-all shadow-md hover:shadow-lg active:scale-90"
          aria-label="送信"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
