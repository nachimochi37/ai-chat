# AI Chat Bot

## プロジェクト概要

エンタメ目的のAIチャットボット。一般ユーザー（自分や周囲の人）が気軽に楽しめるWebアプリ。

## 技術スタック

- **フレームワーク**: Next.js (App Router) + TypeScript
- **AIモデル**: OpenAI gpt-4o-mini
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel
- **DB**: なし
- **状態管理**: ローカルストレージ（会話履歴・ログイン状態）

## 機能要件

### 認証
- ユーザーID・パスワードによるシンプルなログイン
- 認証情報はVercelの環境変数で管理（サーバーサイドで検証）
- ログイン状態はlocalStorageまたはCookieで保持
- ログアウト機能

### チャット
- OpenAI gpt-4o-mini を使用した自然な対話
- ストリーミング応答（Server-Sent Events）
- 会話履歴をローカルストレージに保存（リロード後も保持）
- 新しい会話を始めるリセット機能

## UIデザイン方針

全体的に「可愛い」テイストで統一する。

- **カラーパレット**: パステルピンク・ラベンダー・ミントなど柔らかい色合い
- **フォント**: 丸みのあるフォント（例: `Nunito`, `M PLUS Rounded 1c`）
- **角丸**: ボタン・カード・吹き出しは大きめの角丸（`rounded-2xl` 〜 `rounded-full`）
- **アニメーション**: メッセージ表示時のふわっとしたフェードイン、送信ボタンのホバーエフェクト
- **アイコン**: 絵文字や丸いアバターアイコンを活用
- **吹き出し**: ユーザーとAIで色を分けたチャット吹き出しデザイン
- **ログイン画面**: 中央寄せのカード型フォーム、ふんわりした背景（グラデーションまたはパターン）

## アーキテクチャ

```
app/
├── page.tsx               # ログインページ（未認証時のデフォルト）
├── chat/
│   └── page.tsx           # チャット画面（認証済みのみアクセス可）
├── api/
│   ├── auth/
│   │   └── route.ts       # ログイン認証エンドポイント
│   └── chat/
│       └── route.ts       # OpenAI APIへのプロキシ（ストリーミング）
└── components/
    ├── LoginForm.tsx
    ├── ChatWindow.tsx
    ├── MessageBubble.tsx
    └── ChatInput.tsx
```

## 環境変数

Vercelのダッシュボードおよびローカルの `.env.local` に以下を設定する。

```env
OPENAI_API_KEY=sk-...          # OpenAI APIキー
AUTH_USERNAME=your_username    # ログインID
AUTH_PASSWORD=your_password    # ログインパスワード
```

`.env.local` はgitにコミットしない（`.gitignore` に含める）。

## 認証フロー

1. ユーザーがID・PWを入力してログインフォームを送信
2. `/api/auth` エンドポイントでサーバーサイドの環境変数と照合
3. 認証成功 → トークン（またはフラグ）をlocalStorageに保存
4. チャット画面へリダイレクト
5. 以降のリクエストはlocalStorageのトークンで認証状態を維持
6. ログアウト → localStorageのトークンを削除してログインページへ

## 会話履歴

- ローカルストレージのキー: `chat_history`
- 形式: `[{ role: "user" | "assistant", content: string }]`
- リセットボタンでローカルストレージの履歴を削除

## 開発セットアップ

```bash
npx create-next-app@latest ai-chat --typescript --tailwind --app
cd ai-chat
npm install openai
cp .env.example .env.local  # 環境変数を設定する
npm run dev
```

## デプロイ手順

1. GitHubにリポジトリを作成してpush
2. Vercelにインポート
3. Vercelダッシュボードで環境変数を設定
4. デプロイ実行

## テスト規約

テストコードを書く際は必ず **[TESTING.md](./TESTING.md)** を参照すること。

---

## 設計上の注意点

- OpenAI APIキーはサーバーサイド（`/api/chat`）のみで使用し、クライアントに露出させない
- 認証情報の照合もサーバーサイドで行う
- ローカルストレージは端末・ブラウザ固有のため、別端末では履歴・ログイン状態が引き継がれない
