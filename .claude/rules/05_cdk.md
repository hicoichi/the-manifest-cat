# AWS CDK

CDK v2を使用します。

インフラはコード化します。

Lambdaはできるだけ単一責務にします。

イベント連携を優先してください。

DynamoDBは状態管理に利用します。

サービス選定に迷った場合は

サーバーレス

↓

マネージドサービス

↓

コンテナ

の順で検討してください。

## Stack構成

エントリポイントはメインスタック（`CatStateStack`）のみです。

AWSリソースはL2 Constructで定義し、メインスタックから呼び出してください。

NestedStackは使いません。単一スタックでConstructを使って整理します。

```
CatStateStack（cdk.Stack）
    ├── Database（Construct）
    ├── CatEventBus（Construct）
    └── （以降のリソースも同様）
```

Constructは `lib/constructs/` に1リソース1ファイルで配置します。
