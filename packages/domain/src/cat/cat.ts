import type { CatState } from './cat-state';
import type { Personality } from './personality';
import type { CatMemory } from './cat-memory';

// 猫の集約：DynamoDBに永続化される単一の真実
export type Cat = {
  readonly id: string;
  readonly state: CatState;
  readonly personality: Personality;
  readonly memory: CatMemory;
  readonly updatedAt: Date;
};
