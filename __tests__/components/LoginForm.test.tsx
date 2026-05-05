import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LoginForm', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    global.fetch = jest.fn()
  })

  test('ユーザー名が空のままsubmitするとバリデーションエラーが表示される', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    expect(screen.getByText('ユーザー名とパスワードを入力してください')).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  test('パスワードが空のままsubmitするとバリデーションエラーが表示される', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText('ユーザー名'), 'testuser')
    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    expect(screen.getByText('ユーザー名とパスワードを入力してください')).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  test('正しい入力でsubmitすると認証情報を含むPOSTリクエストが送信される', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true })
    render(<LoginForm />)

    await user.type(screen.getByLabelText('ユーザー名'), 'testuser')
    await user.type(screen.getByLabelText('パスワード'), 'testpass')
    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    expect(fetch).toHaveBeenCalledWith('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
    })
  })

  test('APIが401を返すとレスポンスのエラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'ユーザー名またはパスワードが違います' }),
    })
    render(<LoginForm />)

    await user.type(screen.getByLabelText('ユーザー名'), 'wronguser')
    await user.type(screen.getByLabelText('パスワード'), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    await waitFor(() => {
      expect(screen.getByText('ユーザー名またはパスワードが違います')).toBeInTheDocument()
    })
    expect(mockPush).not.toHaveBeenCalled()
  })

  test('認証成功時に/chatへリダイレクトされる', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true })
    render(<LoginForm />)

    await user.type(screen.getByLabelText('ユーザー名'), 'testuser')
    await user.type(screen.getByLabelText('パスワード'), 'testpass')
    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat')
    })
  })

  test('fetchが失敗したときネットワークエラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    render(<LoginForm />)

    await user.type(screen.getByLabelText('ユーザー名'), 'testuser')
    await user.type(screen.getByLabelText('パスワード'), 'testpass')
    await user.click(screen.getByRole('button', { name: /ログイン/ }))

    await waitFor(() => {
      expect(screen.getByText('ネットワークエラーが発生しました')).toBeInTheDocument()
    })
  })
})
