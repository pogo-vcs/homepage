---
title: diff
description: Show differences between changes
---

Display differences between changes in unified diff format.

The diff command compares file contents between two changes and shows what has
been added, removed, or modified.

Arguments:
- No arguments: Compare current change to its parent
- One argument: Compare specified change to current change
- Two arguments: Compare first change to second change

You can specify changes using:
- Full change name (e.g., "bitter-rose-1234")
- Change name prefix (e.g., "bitter-rose")
- Bookmark name (e.g., "main")

The output uses Git-style unified diff format, making it easy to see exactly
what changed between two versions.

## Usage

```bash
pogo diff
```

## Flags

- `--color`: Enable colored output
- `--include-large-files`: Include files larger than 1MiB in diff

## Examples

```bash
# Compare current change to its parent
pogo diff

# Compare current change to main bookmark
pogo diff main

# Compare two specific changes
pogo diff bitter-rose sweet-flower

# Compare using change prefixes
pogo diff bitter sweet
```

