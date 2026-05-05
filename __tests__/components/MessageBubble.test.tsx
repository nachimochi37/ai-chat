import { render, screen } from '@testing-library/react'
import MessageBubble from '@/components/MessageBubble'

describe('MessageBubble', () => {
  test('userメッセージの内容が正しく表示される', () => {
    render(<MessageBubble message={{ role: 'user', content: 'こんにちは！' }} />)

    expect(screen.getByText('こんにちは！')).toBeInTheDocument()
  })

  test('assistantメッセージの内容が正しく表示される', () => {
    render(<MessageBubble message={{ role: 'assistant', content: 'はい、どうぞ！' }} />)

    expect(screen.getByText('はい、どうぞ！')).toBeInTheDocument()
  })

  test('userメッセージのとき🌟アバターが表示される', () => {
    render(<MessageBubble message={{ role: 'user', content: 'test' }} />)

    expect(screen.getByText('🌟')).toBeInTheDocument()
  })

  test('assistantメッセージのとき🤖アバターが表示される', () => {
    render(<MessageBubble message={{ role: 'assistant', content: 'test' }} />)

    expect(screen.getByText('🤖')).toBeInTheDocument()
  })

  test('userメッセージのとき🤖アバターは表示されない', () => {
    render(<MessageBubble message={{ role: 'user', content: 'test' }} />)

    expect(screen.queryByText('🤖')).not.toBeInTheDocument()
  })

  test('assistantメッセージのとき🌟アバターは表示されない', () => {
    render(<MessageBubble message={{ role: 'assistant', content: 'test' }} />)

    expect(screen.queryByText('🌟')).not.toBeInTheDocument()
  })

  test('改行を含むメッセージが正しく表示される', () => {
    const content = '1行目\n2行目\n3行目'
    render(<MessageBubble message={{ role: 'user', content }} />)

    // whitespace-pre-wrap で改行が保持されているか textContent で検証
    const bubble = screen.getByText((_, el) => el?.textContent === content)
    expect(bubble).toBeInTheDocument()
  })
})
