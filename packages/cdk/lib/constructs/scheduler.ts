import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib/core';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import * as schedulerTargets from 'aws-cdk-lib/aws-scheduler-targets';
import * as events from 'aws-cdk-lib/aws-events';
import * as iam from 'aws-cdk-lib/aws-iam';

type SchedulerProps = {
  readonly eventBus: events.IEventBus;
};

export class Scheduler extends Construct {
  constructor(scope: Construct, id: string, props: SchedulerProps) {
    super(scope, id);

    const role = new iam.Role(this, 'SchedulerRole', {
      assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
    });

    props.eventBus.grantPutEventsTo(role);

    // 15分ごとに発火するTickスケジュール
    new scheduler.Schedule(this, 'TickSchedule', {
      scheduleName: 'cat-tick',
      schedule: scheduler.ScheduleExpression.rate(
        cdk.Duration.minutes(15)
      ),
      target: new schedulerTargets.EventBridgePutEvents(
        {
          eventBus: props.eventBus,
          source: 'cat.scheduler',
          detailType: 'tick',
          detail: scheduler.ScheduleTargetInput.fromObject({
            type: 'tick',
          }),
        },
        { role }
      ),
    });
  }
}
