import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { DatabaseStack } from './stacks/database-stack';
import { EventBusStack } from './stacks/event-bus-stack';

export class CatStateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new DatabaseStack(this, 'Database');
    const eventBus = new EventBusStack(this, 'EventBus');

    new cdk.CfnOutput(this, 'CatStateTableName', {
      value: database.catStateTable.tableName,
    });

    new cdk.CfnOutput(this, 'CatEventBusName', {
      value: eventBus.catEventBus.eventBusName,
    });
  }
}
