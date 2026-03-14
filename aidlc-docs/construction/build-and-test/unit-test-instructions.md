# Unit Test Execution

## Run Unit Tests

### 1. Execute All Unit Tests
```bash
npm test
```

### 2. Review Test Results
- **Expected**: 3 ファイルのテストが成功、0 failures
- **Test Coverage**: 厳密な閾値は未設定
- **Test Report Location**: 標準出力

### 3. Fix Failing Tests
1. 失敗したテスト名を確認
2. 対象コードを修正
3. `npm test` を再実行

## Included Test Targets
- `tests/analyze-image.test.ts`
- `tests/api-analyze.test.ts`
- `tests/page.test.tsx`
