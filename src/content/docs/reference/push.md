---
title: push
description: Push all changes to the configured Pogo server
---

Push all local changes to the configured Pogo server.

This command uploads all modified, added, and deleted files to the server,
updating the current change. Unlike Git, you don't need to stage files first,
all changes in your working directory are pushed.

The push might be rejected if:
- The current change is read-only (has children or bookmarks pointing to it)
- You don't have write permissions to the repository
- Network or server issues occur

Use the --force flag to override read-only protection, but be careful as this
can break the history for other users.

## Usage

```bash
pogo push
```

## Flags

- `--force`, `-f`: Force push even if the change is readonly

## Examples

```bash
# Push all changes to the server
pogo push

# Force push even if the change is read-only (use with caution!)
pogo push --force

# Short form of force push
pogo push -f
```

