import * as cdk from 'aws-cdk-lib/core';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class CatStateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 猫の状態テーブル（Single Source of Truth）
    const catStateTable = new dynamodb.Table(this, 'CatStateTable', {
      tableName: 'cat-state',
      partitionKey: {
        name: 'catId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // システム全体のイベントバス
    const eventBus = new events.EventBus(this, 'CatEventBus', {
      eventBusName: 'cat-event-bus',
    });

    new cdk.CfnOutput(this, 'CatStateTableName', {
      value: catStateTable.tableName,
    });

    new cdk.CfnOutput(this, 'CatEventBusName', {
      value: eventBus.eventBusName,
    });
  }
}
