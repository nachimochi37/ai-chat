'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError('ユーザー名とパスワードを入力してください')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/chat')
      } else {
        const data = await res.json()
        setError(data.error ?? 'ログインに失敗しました')
      }
    } catch {
      setError('ネットワークエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div>
        <label htmlFor="username" className="block text-sm font-bold text-gray-600 mb-1">
          ユーザー名
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-2 border-pink-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all disabled:opacity-50"
          placeholder="ユーザー名を入力"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold text-gray-600 mb-1">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-pink-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all disabled:opacity-50"
          placeholder="パスワードを入力"
          disabled={loading}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm text-center bg-red-50 rounded-xl py-2 px-3">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-400 to-violet-400 text-white py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-violet-500 disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        {loading ? '🌀 ログイン中...' : 'ログイン 🌸'}
      </button>
    </form>
  )
}
