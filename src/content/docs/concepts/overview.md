---
title: Concepts Overview
description: Understanding Pogo's core concepts and philosophy
---

Pogo is built on a few simple but powerful concepts that make version control straightforward and efficient. Understanding these concepts will help you use Pogo effectively.

## Centralized Architecture

Unlike distributed version control systems, Pogo uses a centralized model:

- **Single Source of Truth**: All repository data lives on the server
- **Simple Mental Model**: No need to understand distributed concepts
- **Efficient Storage**: Deduplication happens at the server level
- **Easy Collaboration**: Everyone works with the same remote

This doesn't mean you can't work offline - Pogo caches data locally for performance, but the server is always the authoritative source.

## Changes, Not Commits

In Pogo, the fundamental unit is a **change**, not a commit:

- **Mutable Until Finalized**: You can update a change multiple times before creating a new one
- **Describe First**: Document your intent before implementation
- **Push Often**: Sync with the server frequently without "polluting" history
- **Natural History**: The final history reflects actual development milestones

### Change Lifecycle

1. **Create**: Start with `pogo new` or automatically get one on init
2. **Describe**: Use `pogo describe` to document your intent
3. **Work**: Make modifications to your files
4. **Push**: Use `pogo push` to sync (can do this multiple times)
5. **Finalize**: Use `pogo new` to start the next change

## Automatic Naming

Pogo automatically generates unique names for changes:

- **No Branch Names**: No need to think of branch names
- **Memorable Identifiers**: Names like `abc123` are short and unique
- **Stable References**: Names never change once assigned
- **Readable**: Names are composed using a custom base32 format that only includes characters that are unambiguous in every font.

## Bookmarks Instead of Branches

Pogo uses bookmarks to mark important changes:

- **Lightweight Tags**: Bookmarks are just pointers to changes
- **Moveable**: Unlike tags, bookmarks can be moved
- **Special "main"**: The `main` bookmark acts like a default branch
- **Version Marking**: Use bookmarks for releases (`v1.0.0`, `v2.0.0`)

### Bookmark Conventions

- `main` - Current development head (like master/main in Git)
- `v1.0.0` - Version releases
- `stable` - Last stable release
- `staging` - Pre-production version

The only enforced bookmark name it `main`.

## First-Class Conflicts

Pogo treats conflicts as a normal part of development instead of blocking progress:

- **Push Conflicts**: You can push changes even with conflicts
- **Resolve Later**: Conflicts don't block progress
- **Clear Marking**: Conflicts are clearly marked in files
- **Collaborative Resolution**: Others can help resolve conflicts

This approach means:

- No merge anxiety
- Natural parallel development
- Deferred conflict resolution
- Clear conflict ownership

## Natural Branching

Branching in Pogo happens naturally through parent-child relationships:

- **Multiple Children**: Any change can have multiple children
- **Multiple Parents**: Merges are changes with multiple parents
- **No Named Branches**: Branches exist implicitly through the graph
- **Automatic Convergence**: Development naturally converges at merge points

### Creating Branches

Simply create a new change from any parent:

```bash
# Create branch from current change
pogo new

# Create branch from specific change
pogo edit abc123
pogo new
```

### Merging

Create a change with multiple parents:

```bash
pogo new parent1 parent2
```

This automatically picks the right merging-strategy.
Merging-stategy is meant in a mathematical sense, there is no rebase vs merge.

Text merge can be performed on any unicode text file (UTF-8, UTF-16 LE, UTF-16 BE, UTF-32 LE, UTF-32 BE). On conflict you will get the Git conflict markers you are used to.

When binary files conflict, You will get all of the files. They are renamed to signal the conflict and where each file came from.

When pushing, Pogo will automatically detect conflict markers. You don't have to mark anything as "resolved".

## Working Copy

Your working copy is your local view of the repository:

- **Current Change**: The change you're currently working on
- **Local Files**: Your modified files
- **Ignored Files**: Use the familiar `.gitignore` syntax, the ignore file can be called `.pogoignore` or `.gitignore`
- **Conflict Markers**: Unresolved conflicts from merges

The working copy is synchronized with:

- `pogo push` - Send changes to server
- `pogo edit` - Switch to different change
- `pogo new` - Start fresh change

Your local working copy has no knowledge about the history.

## Object Storage

Pogo efficiently stores file content:

- **Content-Addressed**: Files stored by hash
- **Deduplication**: Identical content stored once
- **Binary Support**: Handles all file types
- **Compression**: Automatic compression for text files

## Authentication

Pogo uses token-based authentication:

- **Personal Access Tokens**: Secure, revocable tokens
- **Keyring Storage**: Tokens stored securely in system keyring
- **Per-Server**: Different tokens for different servers
- **Repository Scoping**: Tokens can be scoped to specific repositories

## Go Module Support

Pogo repositories can be imported as Go modules:

- **Direct Import**: No proxy or special configuration needed
- **Version Support**: Use bookmarks as versions
- **Standard Tooling**: Works with standard Go tools

Example:

```go
import "your-server.com/your-repo"
```

## Next Steps

- Learn about [Changes in detail](/concepts/changes)
- Understand [Bookmarks](/concepts/bookmarks)
- Explore [Conflict handling](/concepts/conflicts)
- See [practical workflows](/guides/basic-workflow)
