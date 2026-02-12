---
title: sync
description: Trunk based update of your divergent line of changes
---

Sync is for a Trunk based workflow. It merges your change with a trunk (defaults to main, can be adjusted passing another tag or change name) and if there are no conflicts, sets the given trunk bookmark to the newly created change. If there are conflicts, you are prompted to do so yourself.

## Usage

```bash
pogo sync
```

