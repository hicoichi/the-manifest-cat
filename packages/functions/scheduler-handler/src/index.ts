import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import type { EventBridgeEvent } from 'aws-lambda';

const client = new LambdaClient({});

const CAT_DECISION_FUNCTION_NAME = process.env.CAT_DECISION_FUNCTION_NAME ?? '';
const CAT_ID = process.env.CAT_ID ?? '';

type TickDetail = {
  readonly type: 'tick';
};

export const handler = async (
  event: EventBridgeEvent<'tick', TickDetail>
): Promise<void> => {
  console.log('Tick received', JSON.stringify(event));

  if (!CAT_DECISION_FUNCTION_NAME) {
    // Cat Decision Lambda 実装前は何もしない（#11-16）
    console.log('CAT_DECISION_FUNCTION_NAME not configured, skipping');
    return;
  }

  await client.send(
    new InvokeCommand({
      FunctionName: CAT_DECISION_FUNCTION_NAME,
      InvocationType: 'Event', // 非同期呼び出し
      Payload: JSON.stringify({ catId: CAT_ID }),
    })
  );

  console.log('Cat Decision invoked', { catId: CAT_ID });
};
