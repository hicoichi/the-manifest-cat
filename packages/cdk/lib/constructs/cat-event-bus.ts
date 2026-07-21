import * as events from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

export class CatEventBus extends Construct {
  readonly eventBus: events.EventBus;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.eventBus = new events.EventBus(this, 'CatEventBus', {
      eventBusName: 'cat-event-bus',
    });
  }
}
