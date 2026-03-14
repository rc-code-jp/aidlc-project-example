# 要件確認質問

以下の質問に、各 `[Answer]:` の後ろへ回答してください。選択肢で当てはまるものがない場合は、`X` を選んで内容を追記してください。

## Question 1
この Web アプリの想定利用形態はどれですか。

A) 単一ページのシンプルなアップロード画面でよい
B) ログイン付きの業務アプリとして作りたい
C) API とフロントエンドを分けた構成にしたい
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
犬判定の実装方針として、どれを想定していますか。

A) 学習済みの画像分類モデルを利用して「dog」確率をそのまま使いたい
B) 学習済みモデルの結果を加工して「犬っぽさ」を補正したい
C) 独自データで追加学習したモデルを使いたい
X) Other (please describe after [Answer]: tag below)

[Answer]: Gemini AI (API) を利用する。 AIにはシステムプロンプトで仕様を伝える。

## Question 3
「犬っぽい物が写っている場合はパーセントを増やす」の判定ルールは、どれに近いですか。

A) オオカミ、ぬいぐるみ、犬のイラストなども高めに出したい
B) 本物の犬のみ高くし、犬っぽい物は中程度までにしたい
C) まずは単純にモデル出力をそのまま表示できればよい
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 4
アップロード画像の取り扱いはどれですか。

A) 画像は判定後すぐ破棄し、保存しない
B) 画像と判定結果を履歴として保存したい
C) まだ未定なので、まずは保存しない前提でよい
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
結果表示に必要な内容はどれですか。

A) 犬っぽさのパーセントだけ表示すればよい
B) パーセントに加えて「犬 / 犬っぽい / 犬ではない」などの文言も表示したい
C) パーセント、判定理由、候補ラベルを表示したい
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 6
インフラや実行環境の希望はありますか。

A) まずはローカルで動く最小構成の Web アプリにしたい
B) AWS 上に載せやすい構成を前提にしたい
C) すでに使いたい技術スタックが決まっている
X) Other (please describe after [Answer]: tag below)

[Answer]: A
