import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from '@/components/ChatInput'

describe('ChatInput', () => {
  test('メッセージを入力してEnterを押すとonSendが入力値で呼ばれる', async () => {
    const user = userEvent.setup()
    const onSend = jest.fn()
    render(<ChatInput onSend={onSend} disabled={false} />)

    await user.type(screen.getByRole('textbox'), 'こんにちは')
    await user.keyboard('{Enter}')

    expect(onSend).toHaveBeenCalledWith('こんにちは')
    expect(onSend).toHaveBeenCalledTimes(1)
  })

  test('Shift+Enterを押してもonSendは呼ばれない', async () => {
    const user = userEvent.setup()
    const onSend = jest.fn()
    render(<ChatInput onSend={onSend} disabled={false} />)

    await user.type(screen.getByRole('textbox'), 'こんにちは')
    await user.keyboard('{Shift>}{Enter}{/Shift}')

    expect(onSend).not.toHaveBeenCalled()
  })

  test('空白のみの入力でEnterを押してもonSendは呼ばれない', async () => {
    const user = userEvent.setup()
    const onSend = jest.fn()
    render(<ChatInput onSend={onSend} disabled={false} />)

    await user.type(screen.getByRole('textbox'), '   ')
    await user.keyboard('{Enter}')

    expect(onSend).not.toHaveBeenCalled()
  })

  test('送信後に入力欄がクリアされる', async () => {
    const user = userEvent.setup()
    const onSend = jest.fn()
    render(<ChatInput onSend={onSend} disabled={false} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'テストメッセージ')
    await user.keyboard('{Enter}')

    expect(textarea).toHaveValue('')
  })

  test('disabled=trueのとき入力欄が無効化される', () => {
    render(<ChatInput onSend={jest.fn()} disabled={true} />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('disabled=trueのとき送信ボタンが無効化される', () => {
    render(<ChatInput onSend={jest.fn()} disabled={true} />)

    expect(screen.getByRole('button', { name: '送信' })).toBeDisabled()
  })

  test('入力が空のとき送信ボタンが無効化される', () => {
    render(<ChatInput onSend={jest.fn()} disabled={false} />)

    expect(screen.getByRole('button', { name: '送信' })).toBeDisabled()
  })
})
