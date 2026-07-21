import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export class CatStateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 猫の状態管理リソースをここに追加していく
  }
}
