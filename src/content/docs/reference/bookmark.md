---
title: bookmark
description: Manage bookmarks for changes
---

Manage bookmarks that point to specific changes in your repository.

Bookmarks in Pogo are similar to tags and branches in Git combined. They are
named references to specific changes that make it easy to find important
versions of your code.

Common bookmark patterns:
- "main" - The current production/stable version (treated specially by Pogo)
- "v1.0.0", "v2.1.3" - Semantic version tags for releases
- "feature-xyz" - Mark the completion of a feature
- "before-refactor" - Mark a point before major changes

The "main" bookmark is special, it's treated as the default branch and is
what new users will see when they clone your repository.

## Usage

```bash
pogo bookmark
```

## Aliases

- `b`

## bookmark list

List all bookmarks in the repository along with the changes they point to.

This shows you all named references in your repository, making it easy to
see important versions, releases, and the current "main" branch.

## Usage

```bash
pogo bookmark list
```

## Aliases

- `l`

## Examples

```bash
  # List all bookmarks
  pogo bookmark list

  # Using the short alias
  pogo b l
```

## bookmark set

Set a bookmark to point to a specific change.

If no change is specified, the bookmark will point to the current change.
Setting a bookmark to a change that already has the bookmark will move it.

Bookmarks make changes read-only by default to preserve history. Use the
push --force flag if you need to modify a bookmarked change.

## Usage

```bash
pogo bookmark set <name> [change]
```

## Aliases

- `s`

## Examples

```bash
# Set "main" bookmark to current change
pogo bookmark set main

# Set "v1.0.0" bookmark to current change
pogo bookmark set v1.0.0

# Set "main" bookmark to a specific change
pogo bookmark set main sunny-sunset-42

# Move an existing bookmark to current change
pogo bookmark set production

# Using the short alias
pogo b s main
```

