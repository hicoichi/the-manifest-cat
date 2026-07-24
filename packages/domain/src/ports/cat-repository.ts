import type { Cat } from '../cat';

// 猫の状態を永続化するリポジトリのインターフェース
// 実装はfunctions層がAWS SDKを使って行う
export type CatRepository = {
  findById(catId: string): Promise<Cat | null>;
  save(cat: Cat): Promise<void>;
};
