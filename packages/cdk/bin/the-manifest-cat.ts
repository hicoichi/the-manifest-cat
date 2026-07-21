#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CatStateStack } from '../lib/cat-state-stack';

const app = new cdk.App();
new CatStateStack(app, 'CatStateStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
