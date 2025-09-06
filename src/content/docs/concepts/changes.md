---
title: Changes
description: Understanding Pogo's change-based version control model
---

Changes are the fundamental unit of version control in Pogo. Unlike traditional commits, changes are mutable and represent a complete unit of work.

## What is a Change?

A change in Pogo represents:

- A set of file modifications
- A description of the work
- Parent-child relationships with other changes
- A unique, automatically-generated identifier

### Key Characteristics

**Mutable Until New**

- You can modify a change multiple times
- Each push overwrites the previous version

**Content-Addressed**

- Changes are identified by their name
- Names are stable and unique
- Short prefixes are usually sufficient
- Log shows you the uniquely identifying prefix

**Relationship-Based**

- Every change knows its parent(s)
- Multiple children create implicit branches
- Multiple parents represent merges

### Creating Changes

New changes are created with the `new` command:

```bash
# Create from current change
pogo new

# Create from specific parent
pogo new parent-change-name

# Create with multiple parents
pogo new parent-a parent-b
```

### Describing Changes

Good descriptions are crucial for understanding history:

```bash
# Set description interactively (opens editor)
pogo describe

# Set description directly
pogo describe -m "fix: auth bug in login flow"
```

#### Writing Good Descriptions

**Do:**

- Explain WHY, not just what
- Include context and motivation
- Reference issues or tickets
- Mention breaking changes

**Don't:**

- Just list file changes
- Use generic messages like "updates"
- Include temporary notes

### Pushing Changes

Push synchronizes your change with the server:

```bash
# Push current change
pogo push

# Push overwrites - no new history created
pogo push  # First push
# ... more work ...
pogo push  # Overwrites previous push
```

This allows you to:

- Save work in progress
- Share incomplete changes
- Iterate without cluttering history

## Change Lifecycle

### 1. Birth

A change is born when you:

- Initialize a repository (creates first change)
- Run `pogo new` (creates child change)

### 2. Development

During development, you:

- Describe the change's purpose
- Modify files
- Push to save/share progress
- Update description as needed

### 3. Finalization

A change gets immutable when:

- You create a new change (`pogo new`)
- A bookmark points to it

## Change Relationships

### Parent-Child

Every change (except the root) has at least one parent:

```
root (abc123)
  └── feature-start (def456)
      ├── feature-impl (ghi789)
      └── feature-tests (jkl012)
```

### Multiple Children (Branching)

A change can have multiple children, creating branches:

```bash
# From change abc123
pogo edit abc123
pogo new  # Creates child 1
# ... work ...

pogo edit abc123
pogo new  # Creates child 2 (branch)
```

### Multiple Parents (Merging)

A change can have multiple parents (merge):

```bash
# Merge two changes (when implemented)
pogo new parent1 parent2
```

## Change Names

### Automatic Generation

Pogo generates unique names automatically:

- Randomly generated
- Base32 with only unambiguous characters in every font
- Always unique within repository

### Referencing Changes

You can reference changes by:

- Unique name prefix: `abc123`
- Full name: `abc123def456...`
- Bookmark: `main`, `v1.0.0`

## Change Properties

### Metadata

Each change stores:

- **Author**: Who created it
- **Created**: Initialization of the change
- **Updated**: Last push
- **Description**: What it does
- **Parents**: Where it came from
- **File snapshot**: Complete file state

## Next Steps

- Learn about [Bookmarks](/concepts/bookmarks)
- Understand [Conflicts](/concepts/conflicts)
- Explore [Basic workflows](/guides/basic-workflow)
- See [CLI reference](/reference/commands)
