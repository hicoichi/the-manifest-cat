import * as cdk from 'aws-cdk-lib/core';
import * as events from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class EventBusStack extends cdk.NestedStack {
  readonly catEventBus: events.EventBus;

  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    this.catEventBus = new events.EventBus(this, 'CatEventBus', {
      eventBusName: 'cat-event-bus',
    });
  }
}
