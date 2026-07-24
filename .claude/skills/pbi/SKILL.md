PBIをGitHub Issueとして作成するコマンドです。

$ARGUMENTS にタイトルが含まれている場合はそれを使用します。

以下の情報を収集してください。不明な場合はユーザーに確認します。

1. **タイトル**: PBIの名称
2. **Epic**: 所属するEpic番号（1〜7）
3. **目的**: このPBIで達成すること（1〜2文）
4. **実装内容**: 実装する内容の箇条書き
5. **補足**: 設計上の判断・注意点・依存関係（不要なら省略可）

Epicとmilestone名の対応：
- 1 → "Epic 1: Existence（存在）"
- 2 → "Epic 2: Perception（知覚）"
- 3 → "Epic 3: Decision（意思決定）"
- 4 → "Epic 4: Manifestation（顕現）"
- 5 → "Epic 5: Evidence（証拠）"
- 6 → "Epic 6: Observation（観測）"
- 7 → "Epic 7: Evolution（変容）"

情報が揃ったらtemplate.mdのフォーマットでgh issue createを実行します。

補足が不要な場合は `## 補足` セクションを省略してください。
