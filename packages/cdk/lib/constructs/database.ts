import * as cdk from 'aws-cdk-lib/core';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class Database extends Construct {
  readonly catStateTable: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.catStateTable = new dynamodb.Table(this, 'CatStateTable', {
      tableName: 'cat-state',
      partitionKey: {
        name: 'catId',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
  }
}
