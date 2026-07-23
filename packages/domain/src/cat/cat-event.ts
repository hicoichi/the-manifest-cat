import type { CatMood, CatLocation } from './cat-state';

// 各イベントのペイロード（Discriminated Union）
export type CatEventPayload =
  // ご飯を食べた
  | { readonly type: 'meal_consumed' }
  // 眠りについた
  | { readonly type: 'sleep_started' }
  // 目が覚めた
  | { readonly type: 'sleep_ended' }
  // 遊び始めた（サーボ・LEDと連動）
  | { readonly type: 'play_started' }
  // 遊び終わった
  | { readonly type: 'play_ended' }
  // グルーミングを始めた
  | { readonly type: 'grooming_started' }
  // 気分が変わった
  | { readonly type: 'mood_changed'; readonly from: CatMood; readonly to: CatMood }
  // 場所が移動した
  | { readonly type: 'location_changed'; readonly from: CatLocation; readonly to: CatLocation }
  // 空腹で鳴いた（スピーカーと連動）
  | { readonly type: 'hunger_cry' }
  // ゴロゴロした（スピーカーと連動）
  | { readonly type: 'purring' };

// 猫のドメインイベント
export type CatEvent = {
  readonly id: string;
  readonly catId: string;
  readonly occurredAt: Date;
  readonly payload: CatEventPayload;
};

export type CatEventType = CatEventPayload['type'];
