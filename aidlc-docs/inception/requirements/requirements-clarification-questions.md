# 要件補足質問

前回の回答から、Gemini API を利用したい意図は確認できました。ただし、実装構成を確定するために次の 1 点だけ補足が必要です。

## Ambiguity 1: Gemini API の呼び出し方式
Q2 では「Gemini AI (API) を利用する。AIにはシステムプロンプトで仕様を伝える。」とありましたが、Web アプリの構成としては複数の方式が考えられます。API キー管理と実装範囲に影響するため、方式を確定してください。

## Question 1
Gemini API はどの構成で利用したいですか。

A) ブラウザから直接 Gemini API を呼ぶ簡易構成でよい
B) サーバー側 API を用意し、そこから Gemini API を呼ぶ構成にしたい
C) まずはローカル用途なので、実装しやすい方で提案してほしい
X) Other (please describe after [Answer]: tag below)

[Answer]: B
