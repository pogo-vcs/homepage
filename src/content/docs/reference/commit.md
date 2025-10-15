---
title: commit
description: Describe, push, and create a new change in one command
---

Commit is a convenience command that combines three operations:
1. Set/update the description for the current change (describe)
2. Push all changes to the server (push)
3. Create a new empty change for future work (new)

This command streamlines the common workflow of finishing work on the current
change and starting fresh. It's similar to 'git commit' but remember that in
Pogo, your work is continuously saved to the server rather than being staged
locally first.

The command will:
- Open an editor for the description (unless -m or --no-edit is used)
- Upload all your changes to the server
- Create a new change with the current change as parent
- Switch to the new change automatically
- Display the updated change history

This is ideal when you've completed a logical unit of work and want to start
on something new while preserving the current state.

## Usage

```bash
pogo commit
```

## Flags

- `--description`, `-m` <string>: Description for the change
- `--force`, `-f`: Force push even if the change is readonly
- `--no-edit`: Skip the describe step

## Examples

```bash
# Commit with an editor for the description
pogo commit

# Commit with a description from command line
pogo commit -m "fix: resolve database connection timeout"

# Commit without changing the existing description
pogo commit --no-edit

# Typical workflow
pogo describe -m "feat: add user authentication"
# ... make changes ...
pogo push
# ... make more changes ...
pogo commit  # Finalize and start new change
```

