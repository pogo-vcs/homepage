---
title: log
description: Show the change history
---

Display the change history of the repository as a tree of parent/child relationships.

The log shows:
- Change names (automatically generated memorable identifiers)
- Descriptions of what changed and why
- Parent/child relationships between changes
- Bookmarks pointing to specific changes
- The currently checked-out change (marked with *)

Unlike Git's linear log, Pogo's log shows the true tree structure of your
repository, making it easy to see branches and merges. Changes are shown
from newest to oldest by default.

## Usage

```bash
pogo log
```

## Flags

- `--color`: Enable colored output (default: `true`)
- `--number`, `-n` <int32>: Maximum number of changes to display (default: `10`)

## Examples

```bash
# Show the last 10 changes (default)
pogo log

# Show the last 50 changes
pogo log -n 50

# Disable colored output
pogo log --color=false
```

