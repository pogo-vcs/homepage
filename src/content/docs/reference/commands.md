---
title: Commands Overview
description: Complete reference for all Pogo CLI commands
---

Pogo provides a comprehensive set of commands for version control operations. All commands follow a consistent pattern and provide helpful feedback.

## Command Structure

```bash
pogo [command] [subcommand] [arguments] [flags]
```

## Global Flags

These flags are available for all commands:

- `--no-pager` - Disable pager for output
- `--time` - Measure and display command execution time
- `--help` - Show help for any command

## Core Commands

### Repository Management

| Command | Description | Common Usage |
|---------|-------------|--------------|
| [`init`](/reference/init) | Initialize a new repository | `pogo init --name myproject --server localhost:8080` |
| [`info`](/reference/info) | Display working copy status | `pogo info` |
| [`whoami`](/reference/whoami) | Show current authentication | `pogo whoami` |

### Change Management

| Command | Description | Common Usage |
|---------|-------------|--------------|
| [`describe`](/reference/describe) | Set change description | `pogo describe -m "Add feature X"` |
| [`push`](/reference/push) | Push changes to server | `pogo push` |
| [`new`](/reference/new) | Create new change | `pogo new` |
| [`edit`](/reference/edit) | Switch to different change | `pogo edit abc123` |
| [`commit`](/reference/commit) | Describe, push, and new in one | `pogo commit -m "Complete feature"` |

### History and Navigation

| Command | Description | Common Usage |
|---------|-------------|--------------|
| [`log`](/reference/log) | Show change history | `pogo log -n 20` |
| [`bookmark`](/reference/bookmark) | Manage bookmarks | `pogo bookmark set main` |
| [`rm`](/reference/rm) | Remove changes | `pogo rm abc123` |

### Server Operations

| Command | Description | Common Usage |
|---------|-------------|--------------|
| [`serve`](/reference/serve) | Start Pogo server | `pogo serve` |
| [`gc`](/reference/gc) | Run garbage collection | `pogo gc` |
| [`token`](/reference/token) | Manage access tokens | `pogo token set` |

## Common Workflows

### Starting New Work

```bash
# Describe what you're about to do
pogo describe -m "Implement user authentication"

# Make your changes
# ... edit files ...

# Push changes (can do this multiple times)
pogo push

# When done, create a new change
pogo new
```

### Quick Commit

```bash
# Combine describe, push, and new
pogo commit -m "Fix bug in login flow"
```

### Switching Between Changes

```bash
# View available changes
pogo log

# Switch to a different change
pogo edit abc123

# Or switch to a bookmarked version
pogo edit main
```

### Managing Bookmarks

```bash
# Set a bookmark on current change
pogo bookmark set v1.0.0

# List all bookmarks
pogo bookmark list

# Set main to specific change
pogo bookmark set main xyz789
```

## Command Aliases

Several commands have shorter aliases for convenience:

- `pogo desc` → `pogo describe`
- `pogo b` → `pogo bookmark`
- `pogo checkout` → `pogo edit`

## Exit Codes

Pogo uses standard exit codes:

- `0` - Success
- `1` - General error
- `2` - Command parsing error
- `128` - Configuration error

## Environment Variables

Pogo respects these environment variables:

- `POGO_TOKEN` - Personal access token (overrides keyring)
- `POGO_SERVER` - Default server address
- `POGO_NO_PAGER` - Disable pager by default
- `NO_COLOR` - Disable colored output

## Getting Help

Get help for any command:

```bash
# General help
pogo --help

# Command-specific help
pogo push --help

# Subcommand help
pogo bookmark set --help
```

## Shell Completion

Enable tab completion for your shell:

```bash
# Bash
source <(pogo completion bash)

# Zsh
source <(pogo completion zsh)

# Fish
pogo completion fish | source
```

See the [Installation guide](/guides/installation#shell-completion) for permanent setup.