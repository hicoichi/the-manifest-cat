import * as path from 'path';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

type SchedulerHandlerProps = {
  readonly eventBus: events.IEventBus;
};

export class SchedulerHandler extends Construct {
  readonly fn: lambda.IFunction;

  constructor(scope: Construct, id: string, props: SchedulerHandlerProps) {
    super(scope, id);

    // モノレポのルートを projectRoot に指定してパッケージ境界を越えてバンドル
    const repoRoot = path.join(__dirname, '../../../..');

    this.fn = new lambdaNodejs.NodejsFunction(this, 'Function', {
      functionName: 'cat-scheduler-handler',
      entry: path.join(
        __dirname,
        '../../../functions/scheduler-handler/src/index.ts'
      ),
      projectRoot: repoRoot,
      depsLockFilePath: path.join(
        __dirname,
        '../../../functions/scheduler-handler/package-lock.json'
      ),
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        CAT_ID: 'nyanko',
        // CAT_DECISION_FUNCTION_NAME は Epic 3 実装後に追加
      },
    });

    // cat-event-bus の tick イベントをこの Lambda へルーティング
    new events.Rule(this, 'TickRule', {
      eventBus: props.eventBus,
      eventPattern: {
        source: ['cat.scheduler'],
        detailType: ['tick'],
      },
      targets: [new targets.LambdaFunction(this.fn)],
    });
  }
}
