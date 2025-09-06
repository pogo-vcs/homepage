---
title: pogo commit
description: Describe, push, and create a new change in one command
---

The `pogo commit` command combines three common operations into a single command: describe, push, and new. It's a convenience command for the typical workflow of finalizing a change.

## Synopsis

```bash
pogo commit [flags]
```

## Description

The commit command streamlines the workflow of:

1. Setting a description for the current change
2. Pushing it to the server
3. Creating a new change for continued work

This is equivalent to running:

```bash
pogo describe -m "Your message"
pogo push
pogo new
```

## Options

### `-m, --description`

Description for the change. If not provided, opens your default editor.

```bash
pogo commit -m "Fix authentication bug in login flow"
```

### `--no-edit`

Skip the describe step and use the existing description.

```bash
pogo commit --no-edit
```

### `-h, --help`

Display help information for the command.

## Related Commands

- [`pogo describe`](/reference/describe) - Set change description
- [`pogo push`](/reference/push) - Push changes to server
- [`pogo new`](/reference/new) - Create a new change

## See Also

- [Basic Workflow Guide](/guides/basic-workflow)
- [Understanding Changes](/concepts/changes)
