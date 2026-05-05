import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="p-8 rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌸</div>
          <h1 className="text-2xl font-extrabold text-gray-700">AIチャット</h1>
          <p className="text-sm text-gray-400 mt-1">ようこそ！ログインしてね✨</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
