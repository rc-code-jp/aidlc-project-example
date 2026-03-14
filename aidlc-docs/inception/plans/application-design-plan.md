# Application Design Plan

## Plan Checklist
- [x] 要件書とユーザーストーリーを読み込み、主要コンポーネント候補を抽出する
- [x] 設計対象をフロントエンド、サーバー API、Gemini 連携、設定管理に整理する
- [x] 技術スタックを確定する
- [x] `components.md` を作成する
- [x] `component-methods.md` を作成する
- [x] `services.md` を作成する
- [x] `component-dependency.md` を作成する
- [x] `application-design.md` を作成する
- [x] 設計の整合性を確認する

## Proposed Design Direction
- 単一リポジトリ内に Web UI とサーバー API を持つ最小構成
- UI は画像アップロード、状態表示、結果表示を担当
- サーバー API は画像受信、Gemini 呼び出し、レスポンス整形を担当
- Gemini 連携部分は専用のクライアントモジュールへ分離し、プロンプトとレスポンス整形を集中管理する
- API キーはサーバー側設定管理コンポーネントで扱う

## Mandatory Artifacts
- [ ] Generate `components.md` with component definitions and high-level responsibilities
- [ ] Generate `component-methods.md` with method signatures and I/O
- [ ] Generate `services.md` with service responsibilities and orchestration
- [ ] Generate `component-dependency.md` with dependency and data flow
- [ ] Generate `application-design.md` as consolidated summary

## Question 1
初期実装の技術スタックとして、どれを採用しますか。

A) React + Node.js/Express の一般的な構成
B) Next.js でフロントエンドとサーバー API をまとめる構成
C) 技術スタックも提案してほしい
X) Other (please describe after [Answer]: tag below)

[Answer]: B
