// 時間帯
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

// 環境音レベル
export type AmbientNoise = 'quiet' | 'moderate' | 'loud';

// 照度レベル
export type BrightnessLevel = 'dark' | 'dim' | 'bright' | 'sunny';

// 温度レベル
export type TemperatureLevel = 'cold' | 'cool' | 'comfortable' | 'warm' | 'hot';

// 外部環境：猫の状態に影響を与える世界の状態
export type WorldState = {
  readonly timeOfDay: TimeOfDay;
  readonly ambientNoise: AmbientNoise;
  readonly brightness: BrightnessLevel;
  readonly temperature: TemperatureLevel;
};
