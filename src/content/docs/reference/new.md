---
title: new
description: Create a new change based on one or more parent changes
---

Create a new change (similar to a commit in Git) based on one or more parent changes.

This command is used when you're ready to start working on something new after
completing your current work. It creates a fresh change that builds upon the
specified parent(s).

Key behaviors:
- If no parents specified, uses the current change as parent
- Automatically switches to the new change after creation
- The previous change becomes read-only to preserve history
- Multiple parents create a merge (combining work from different branches)

By default, this command pushes local changes to the current change before
creating a new one. Use --keep-changes to skip this push and instead add your
local modifications to the newly created change.

Typical workflow:
1. Describe your planned changes with 'pogo describe'
2. Make your code changes
3. Push regularly with 'pogo push' to save your work
4. When done, create a new change with 'pogo new' to start fresh

## Usage

```bash
pogo new
```

## Flags

- `--description`, `-m` <string>: Description for the new change
- `--keep-changes`: Keep local changes for the new change instead of pushing to current

## Examples

```bash
# Create a new change from the current change
pogo new

# Create a new change with a description
pogo new -m "feat: implement user profiles"

# Create a new change from a specific parent
pogo new happy-mountain-7

# Create a merge change with multiple parents
pogo new feature-branch-1 feature-branch-2

# Create from a bookmarked change
pogo new main

# Keep local changes for the new change instead of pushing to current
pogo new --keep-changes
```

