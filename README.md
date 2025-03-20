Next.js を AI 駆動開発する際のベストプラクティスを個人的にまとめたリポジトリ。

## Getting Started

First, install volta:

```bash
brew install volta
```

run the development server:

```bash
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ディレクトリ構成

```bash
.
├── README.md                  # プロジェクトの説明や使い方を記載
├── docs                       # ドキュメントを格納
├── eslint.config.mjs          # ESLintの設定ファイル
├── next-env.d.ts              # Next.jsの型定義ファイル
├── next.config.ts             # Next.jsの設定ファイル
├── package-lock.json          # 依存関係のバージョンを固定するファイル
├── package.json               # プロジェクトのメタデータと依存関係を管理
├── postcss.config.mjs         # PostCSSの設定ファイル
├── .cursor                    # Cusrorのルールを格納
│   └── rules
│       └── base-rule.mdc      # 基本ルールの定義ファイル
├── public                     # 静的ファイルを格納
├── src
│   ├── app                    # ページごとのルーティングや処理を書く
│   │   ├── actions.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── user               # ユーザー関連の機能を格納
│   │       ├── _components    # ユーザー関連のコンポーネント
│   │       ├── actions.ts     # ユーザー関連のアクションを定義するファイル
│   │       └── page.tsx       # ユーザー関連のページコンポーネント
│   └── shared                 # 共通で使うコンポーネントやライブラリを格納
│       ├── components         # 共通で使う再利用可能なコンポーネント
│       ├── constants          # 共通で使う定数
│       ├── libs               # 共通で使うライブラリのラッパー
│       └── types              # 共通で使う型定義
└── tsconfig.json
```
