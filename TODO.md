# 実装計画 TODO

## Phase 1: プロジェクトセットアップ

- [x] Next.js プロジェクト作成
  ```bash
  npx create-next-app@latest ai-chat --typescript --tailwind --app
  ```
- [x] 依存パッケージのインストール
  ```bash
  npm install openai
  npm install @types/node
  ```
- [x] `.env.local` ファイルを作成し環境変数を設定
  - `OPENAI_API_KEY`
  - `AUTH_USERNAME`
  - `AUTH_PASSWORD`
- [x] `.env.local` を `.gitignore` に追加されていることを確認
- [x] Gitリポジトリ初期化 & 初回コミット完了
- [x] GitHubにリポジトリ作成 & push (https://github.com/nachimochi37/ai-chat)

---

## Phase 2: 認証機能

- [x] `/api/auth/route.ts` の実装
  - POST リクエストでID・PWを受け取る
  - 環境変数と照合してtrue/falseを返す
- [x] `LoginForm.tsx` コンポーネントの実装
  - ユーザーID・パスワードの入力フォーム
  - バリデーション（空欄チェック）
  - エラーメッセージ表示
- [x] ログインページ `app/page.tsx` の実装
  - `LoginForm` を配置
  - 認証成功時に `/chat` へリダイレクト
  - ログイン状態をhttpOnlyクッキーで管理
- [x] 認証ガード（未ログイン時に `/chat` へ直接アクセスできないようにする）

---

## Phase 3: チャットAPI

- [ ] `/api/chat/route.ts` の実装
  - OpenAI gpt-4o-mini へのプロキシ
  - ストリーミング応答（Server-Sent Events）
  - 会話履歴（messages配列）を受け取って渡す
  - 認証チェック（未認証リクエストを弾く）

---

## Phase 4: チャットUI

- [ ] `MessageBubble.tsx` コンポーネントの実装
  - ユーザーとAIで吹き出しの色・向きを変える
  - Markdownテキストの表示対応（改行など）
- [ ] `ChatInput.tsx` コンポーネントの実装
  - テキスト入力エリア（Enterで送信・Shift+Enterで改行）
  - 送信ボタン
  - 送信中はローディング表示・入力無効化
- [ ] `ChatWindow.tsx` コンポーネントの実装
  - メッセージ一覧の表示
  - 新しいメッセージが届いたら自動スクロール
  - ストリーミング受信・逐次表示
- [ ] チャットページ `app/chat/page.tsx` の実装
  - localStorageから会話履歴を読み込む
  - 送信・受信のたびにlocalStorageへ保存
  - リセットボタン（会話履歴をクリア）
  - ログアウトボタン

---

## Phase 5: UIデザイン（可愛いテイスト）

- [ ] Google Fonts 設定（`Nunito` または `M PLUS Rounded 1c`）
- [ ] カラーパレットをTailwind設定に追加（パステルピンク・ラベンダー・ミント）
- [ ] ログインページのデザイン
  - パステルグラデーションの背景
  - 中央寄せのカード型フォーム・大きめの角丸
  - 丸みのあるボタン
- [ ] チャット画面のデザイン
  - ヘッダー（タイトル・ログアウトボタン）
  - ユーザー吹き出し（右寄せ・ピンク系）
  - AI吹き出し（左寄せ・ラベンダー系）
  - 丸いアバターアイコン
- [ ] アニメーション実装
  - メッセージ表示時のフェードイン
  - 送信ボタンのホバーエフェクト
  - AIが返答中のタイピングインジケーター（...）

---

## Phase 6: テスト・動作確認

- [ ] ローカルでの動作確認
  - ログイン・ログアウトの動作
  - チャットの送受信
  - ストリーミング表示
  - 会話履歴のリロード後の復元
  - リセット機能
- [ ] 未認証アクセスのリダイレクト確認
- [ ] レスポンシブデザインの確認（スマートフォン表示）

---

## Phase 7: Vercelデプロイ

- [ ] GitHubに最新コードをpush
- [ ] Vercelにプロジェクトをインポート
- [ ] Vercelダッシュボードで環境変数を設定
  - `OPENAI_API_KEY`
  - `AUTH_USERNAME`
  - `AUTH_PASSWORD`
- [ ] デプロイ実行・本番URLで動作確認

---

## 完了条件

- [ ] ログインできる
- [ ] AIと会話できる
- [ ] リロードしても会話履歴が残る
- [ ] 可愛いUIになっている
- [ ] Vercelで公開されている
