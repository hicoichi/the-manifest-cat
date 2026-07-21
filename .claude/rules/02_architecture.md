# アーキテクチャ

このシステムはイベント駆動で設計します。

猫の状態

↓

意思決定

↓

イベント

↓

IoT

IoTは出力装置です。

ビジネスロジックをIoTに持たせてはいけません。

猫の状態だけが真実です。

すべてのイベントは猫の状態から生成してください。

## コンポーネント

| コンポーネント | 役割 |
|---|---|
| EventBridge Scheduler | 時間経過イベントを発行する（Tick/Morning/Night） |
| EventBridge | システム全体のイベントバス。外部入力・内部イベントを中継する |
| Lambda: Scheduler Handler | Schedulerイベントを受信し、猫の状態更新を開始する |
| Lambda: External Event Handler | IoTや外部サービスからのイベントを受信し、猫の状態更新を開始する |
| Lambda: Cat Decision | 猫の現在状態を取得し、意思決定を行い、猫イベントを生成・状態を更新する |
| DynamoDB | 猫の現在状態を保持する。Single Source of Truth |
| Lambda: Event Dispatcher | 猫イベントを各サービスへ配信する |
| IoT Core | MQTT経由でIoTデバイスへ通知する |
| IoT Device | スピーカー・サーボ・LED・センサー |
| CloudWatch Logs | システムログ・猫の行動履歴 |

## イベントフロー

```
Scheduler
    ↓
EventBridge
    ↓
Scheduler Handler
    ↓
Cat Decision
    ↓
DynamoDB (Update State)
    ↓
EventBridge (Cat Event)
    ↓
Event Dispatcher
    ├── IoT Core
    ├── LINE (future)
    ├── AI (future)
    └── Analytics (future)

External Input
    ↓
IoT Core
    ↓
EventBridge
    ↓
External Event Handler
    ↓
Cat Decision
```

## 設計原則

- 猫の状態はDynamoDBのみが保持する
- 猫の意思決定はCat Decisionのみが行う
- EventBridgeを介してコンポーネントを疎結合にする
- IoTデバイスは猫の状態を保持しない
- IoTデバイスはイベントを受信して動作するだけ
- AWSサービスはドメインロジックを持たない

## パッケージ構成

```
packages/
├── domain/     # ドメイン層
├── functions/  # Lambda関数群
├── iot/        # IoT出力層
└── cdk/        # インフラ定義
```

### domain

AWSを知らない層です。

猫の状態・イベントの型定義と、リポジトリのインターフェース（ports）を置きます。

AWS SDKをimportしてはいけません。

### functions

Lambda関数を1関数1ディレクトリで置きます。

ビジネスロジックはdomainに委譲してください。

Lambdaはdomain層の呼び出し口に徹します。

### iot

IoTデバイスの設定とデバイスシャドウの型定義を置きます。

ビジネスロジックを持たせてはいけません。

猫の状態から生成されたイベントを受け取り、出力するだけです。

### cdk

インフラをコードで定義する層です。

すべてのAWSリソースはここで管理します。
