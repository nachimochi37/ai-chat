type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-2 mb-4 animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-purple-400 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
          🤖
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words leading-relaxed shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-pink-400 to-rose-400 text-white rounded-br-sm'
            : 'bg-white text-gray-700 rounded-bl-sm border border-purple-100'
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
          🌟
        </div>
      )}
    </div>
  )
}
