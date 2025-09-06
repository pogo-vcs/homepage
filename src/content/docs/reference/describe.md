---
title: describe
description: Set the description for the current change
---

Set or modify the description for the current change.

In Pogo's workflow, you should describe your changes BEFORE you start working.
This helps you think through what you're about to do and communicate your
intentions to others. You can update the description as you work to reflect
any changes in your implementation approach.

If no description is provided via the -m flag, an editor will open where you
can write a detailed description. The description follows the Conventional
Commits format by default.

The description is crucial for understanding the history of your project and
should explain both WHAT changed and WHY it changed.

## Usage

```bash
pogo describe
```

## Aliases

- `desc`
- `rephrase`

## Flags

- `--description`, `-m` <string>: Description for the change

## Examples

```bash
# Open an editor to write/edit the description
pogo describe

# Set description directly from command line
pogo describe -m "feat: add user authentication system"

# Use aliases for shorter commands
pogo desc -m "fix: resolve memory leak in data processor"
pogo rephrase -m "docs: update API documentation"
```

