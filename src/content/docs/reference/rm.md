---
title: rm
description: Remove a change from the repository
---

Remove a change from the repository permanently.

This is a destructive operation that cannot be undone. Use with caution!

By default, this command removes:
- The specified change
- All child changes (recursively)
- All associated file data

With --keep-children flag:
- Only removes the specified change
- Reconnects children to the removed change's parent(s)
- Preserves the rest of the history tree

You cannot remove:
- The change you're currently working on
- Changes that have bookmarks pointing to them
- The root change of the repository

This command is useful for:
- Cleaning up experimental branches that didn't work out
- Removing accidentally created changes
- Pruning unnecessary history before archiving

This command pushes any changes before running.

In interactive mode, you will be prompted to confirm before deletion.
Use --force to skip confirmation.

## Usage

```bash
pogo rm
```

## Flags

- `--force`, `-f`: Skip confirmation prompt
- `--keep-children`: Only remove the specified change and move its children to its parents

## Examples

```bash
# Remove a change and all its descendants
pogo rm experimental-feature-27

# Remove only the specific change, preserving children
pogo rm broken-change-15 --keep-children

# Remove a change that was created by mistake
pogo rm accidental-branch-3

# Skip confirmation prompt
pogo rm experimental-feature-27 --force

# Cannot remove bookmarked changes
pogo rm main  # Error: cannot remove bookmarked change
```

