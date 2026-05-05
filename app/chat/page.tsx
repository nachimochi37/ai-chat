'use client'

import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium">ログイン成功！チャット画面はPhase 4で実装されます。</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
      >
        ログアウト
      </button>
    </main>
  )
}
