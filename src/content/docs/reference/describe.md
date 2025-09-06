---
title: pogo describe
description: Set the description for the current change
---

The `pogo describe` command sets or updates the description for your current change. This description explains what the change does and why.

## Synopsis

```bash
pogo describe [flags]
```

## Description

Use this command to document your changes before or during development. The description can be updated multiple times until you create a new change with `pogo new`.

## Options

### `-m, --description`
Set the description directly from the command line.

```bash
pogo describe -m "Fix memory leak in worker threads"
```

### `-h, --help`
Display help information for the command.

## Examples

### Interactive editing
```bash
# Opens your default editor
pogo describe
```

### Direct description
```bash
pogo describe -m "Add caching layer to improve API response times"
```

### Multi-line description
```bash
pogo describe -m "Refactor authentication system

- Switch from JWT to session-based auth
- Add rate limiting
- Improve error messages"
```

## Related Commands

- [`pogo commit`](/reference/commit) - Describe, push, and create new change
- [`pogo push`](/reference/push) - Push changes to server
- [`pogo new`](/reference/new) - Create a new change