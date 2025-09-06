---
title: pogo bookmark
description: Manage bookmarks for changes
---

The `bookmark` command manages bookmarks - named references to specific changes.

## Synopsis

```bash
pogo bookmark [subcommand] [flags]
```

## Subcommands

- `set` - Set a bookmark to a change
- `list` - List all bookmarks

## Set Bookmark

Set or move a bookmark to point to a specific change.

### Synopsis

```bash
pogo bookmark set <name> [change] [flags]
```

### Arguments

- `name` - The bookmark name (required)
- `change` - The change ID to bookmark (optional, defaults to current change)

### Examples

```bash
# Set bookmark on current change
pogo bookmark set main

# Set bookmark on specific change
pogo bookmark set v1.0.0 abc123

# Move existing bookmark
pogo bookmark set main def456
```

## List Bookmarks

Display all bookmarks in the repository.

### Synopsis

```bash
pogo bookmark list [flags]
```

### Examples

```bash
# List all bookmarks
pogo bookmark list

# Output format:
# main -> abc123
# v1.0.0 -> def456
# staging -> ghi789
```

## Bookmark Naming

### Conventions

- `main` - Primary development branch
- `v1.0.0` - Version releases
- `stable` - Latest stable release
- `production` - Deployed to production
- `staging` - In staging environment

### Rules

- Names must be alphanumeric with `-`, `_`, `.`, `/`
- Cannot start with numbers
- Case-sensitive
- Must be unique

## Special Bookmarks

### main

The `main` bookmark has special significance:
- Default parent for new changes
- Default target for pulls
- Treated as the primary branch

## Related Commands

- [`pogo edit`](/reference/edit) - Switch to bookmarked change
- [`pogo new`](/reference/new) - Create change from bookmark
- [`pogo log`](/reference/log) - View history with bookmarks