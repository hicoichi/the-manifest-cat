// 時間帯
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

// 環境音レベル
export type AmbientNoise = 'quiet' | 'moderate' | 'loud';

// 外部環境：猫の状態に影響を与える世界の状態
export type WorldState = {
  readonly timeOfDay: TimeOfDay;
  readonly isOwnerHome: boolean;
  readonly ambientNoise: AmbientNoise;
};
