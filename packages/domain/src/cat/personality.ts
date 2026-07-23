// 長期特性：MVPでは固定値。Evolutionで変化を実装する
export type Personality = {
  readonly curiosity: number;   // 0-1: 好奇心の強さ
  readonly sociability: number; // 0-1: 社交性の高さ
  readonly timidity: number;    // 0-1: 臆病さ
  readonly playfulness: number; // 0-1: 遊び好き度
};
