---
title: delete-repo
description: Delete the current repository from the server
---

Delete the current repository from the server permanently.

This is a destructive operation that cannot be undone. It will:
- Delete the repository and all its data from the server
- Run garbage collection to free up disk space
- Remove the local .pogo.db file

In interactive mode, you will be prompted to confirm before deletion.
Use --force to skip confirmation.

## Usage

```bash
pogo delete-repo
```

## Flags

- `--force`, `-f`: Skip confirmation prompt

