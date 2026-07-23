import type { CatMood, CatLocation } from './cat-state';

// 各イベントのペイロード（Discriminated Union）
export type CatEventPayload =
  | { readonly type: 'meal_consumed' }
  | { readonly type: 'sleep_started' }
  | { readonly type: 'sleep_ended' }
  | { readonly type: 'play_started' }
  | { readonly type: 'play_ended' }
  | { readonly type: 'grooming_started' }
  | { readonly type: 'mood_changed'; readonly from: CatMood; readonly to: CatMood }
  | { readonly type: 'location_changed'; readonly from: CatLocation; readonly to: CatLocation }
  | { readonly type: 'hunger_cry' }
  | { readonly type: 'purring' };

// 猫のドメインイベント
export type CatEvent = {
  readonly id: string;
  readonly catId: string;
  readonly occurredAt: Date;
  readonly payload: CatEventPayload;
};

export type CatEventType = CatEventPayload['type'];
