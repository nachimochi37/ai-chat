import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-md bg-white w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">AIチャット</h1>
        <LoginForm />
      </div>
    </main>
  )
}
