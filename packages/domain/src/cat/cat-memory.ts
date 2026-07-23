// 短期記憶：直近の出来事。長期記憶の保持はEvolutionで実装する
export type CatMemory = {
  readonly lastFedAt: Date | null;
  readonly lastInteractedAt: Date | null;
  readonly recentEventNames: readonly string[];
};
