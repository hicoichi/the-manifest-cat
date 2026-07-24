import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Database } from './constructs/database';
import { CatEventBus } from './constructs/cat-event-bus';
import { Scheduler } from './constructs/scheduler';

export class CatStateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new Database(this, 'Database');
    const catEventBus = new CatEventBus(this, 'CatEventBus');
    new Scheduler(this, 'Scheduler', { eventBus: catEventBus.eventBus });

    new cdk.CfnOutput(this, 'CatStateTableName', {
      value: database.catStateTable.tableName,
    });

    new cdk.CfnOutput(this, 'CatEventBusName', {
      value: catEventBus.eventBus.eventBusName,
    });
  }
}
