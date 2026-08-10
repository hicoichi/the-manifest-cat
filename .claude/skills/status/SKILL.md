プロジェクトの現在の進捗・次のタスク・ロードマップを報告するコマンドです。

以下の手順で情報を収集し、報告してください。

## 手順

1. 以下のコマンドでGitHub Issueの一覧を取得する

```
gh issue list --repo hicoichi/the-manifest-cat --limit 50 --state all --json number,title,state,milestone | python3 -c "
import json, sys
data = json.load(sys.stdin)
for i in sorted(data, key=lambda x: x['number']):
    ms = i['milestone']['title'] if i['milestone'] else 'no milestone'
    print(f\"#{i['number']}\t{i['state']}\t{ms}\t{i['title']}\")
"
```

2. 取得した情報をもとに以下のフォーマットで報告する

---

## あらすじ

実装済みの内容を3〜5文で要約する。
技術的な詳細よりも「何ができるようになったか」を重視する。

## 次のタスク

最も番号が小さいOPENのIssueを1件取り上げ、以下を示す。

- Issue番号とタイトル
- 所属Epic
- このタスクで実装すること（1〜2文）

## ロードマップ

各Epicの進捗を一覧で示す。

| Epic | 状態 | PBI進捗 |
|------|------|---------|
| Epic 1: Existence（存在） | ✅ 完了 | 5/5 |
| Epic 2: Perception（知覚） | 🔄 進行中 | 1/5 |
| ... | ... | ... |

各Epicの状態は以下の基準で判定する：
- ✅ 完了：全PBIがCLOSED
- 🔄 進行中：一部CLOSEDかつ残りOPEN
- ⬜ 未着手：全PBIがOPEN

---

報告は日本語で行う。
