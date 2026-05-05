type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
          AI
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words leading-relaxed ${
          isUser
            ? 'bg-pink-400 text-white rounded-br-sm'
            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
          You
        </div>
      )}
    </div>
  )
}
