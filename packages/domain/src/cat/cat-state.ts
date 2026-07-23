// 気分：猫の感情状態
export type CatMood = 'calm' | 'angry' | 'excited' | 'fearful';

// 行動：猫が今していること
export type CatAction =
  | 'sleeping'
  | 'eating'
  | 'playing'
  | 'grooming'
  | 'exploring'
  | 'resting'
  | 'hiding'
  | 'seeking_attention';

// 場所：猫がいる位置
export type CatLocation =
  | 'cat_tower'
  | 'bed'
  | 'food_area'
  | 'window'
  | 'hiding_spot';

// 短期状態：時間とともに変化する猫の内部状態
export type CatState = {
  readonly hunger: number;     // 0-100: 高いほど空腹
  readonly sleepiness: number; // 0-100: 高いほど眠い
  readonly energy: number;     // 0-100: 高いほど元気
  readonly mood: CatMood;
  readonly action: CatAction;
  readonly location: CatLocation;
};
