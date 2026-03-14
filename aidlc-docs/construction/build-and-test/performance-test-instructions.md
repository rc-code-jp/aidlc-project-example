# Performance Test Instructions

## Purpose
UI 改善後も体感性能が大きく悪化していないことを確認する。厳密な SLA は未設定のため、参考確認を行う。

## Performance Requirements
- **Response Time**: Gemini 応答込みで数秒を許容
- **Throughput**: 初期版では単一利用者中心
- **Concurrent Users**: 特段の保証なし
- **Error Rate**: 連続失敗がないことを確認

## Setup Performance Test Environment

### 1. Prepare Test Environment
```bash
npm run dev
```

### 2. Configure Test Parameters
- **Test Duration**: 5 分程度
- **Ramp-up Time**: 任意
- **Virtual Users**: 1 から 3

## Run Performance Checks

### 1. Manual Load Check
```bash
echo "Upload several images sequentially and record approximate response times."
```

### 2. Analyze Results
- 連続操作で UI が固まらないこと
- ローディング表示が維持されること
- プレビュー表示が即座に反映されること
- ドラッグアンドドロップ領域の描画が遅くないこと
- エラー時に復帰できること

## Performance Optimization
性能問題がある場合:
1. Gemini 応答時間を確認
2. 不要な再レンダリングや多重送信を抑制
3. 必要なら結果キャッシュやリトライ戦略を再検討
