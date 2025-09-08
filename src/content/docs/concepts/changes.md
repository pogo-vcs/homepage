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

## Set of modifications

A change stores (as the name implies) changes.
It is a checkpoint of your work.

A change can modify existing files, create new files, or delete files.

When a new change is created, it is in the exact same state as its parent.
When you modify a file, Pogo records your modification in your current change.
This means that the content of a change is mutable.

## Description

Every change has a description.
This documents, what your intentions were when you created it.

The intended workflow is to write a description before you start working on a change.
While working you might change your implementation plan and therefore need to update the description.
The description is mutable, just like the content of a change.

## Parent-Child Relationships

Every change (except the root) has at least one parent.

When creating a change, you specify its parent(s).
Default is the current change.

You can naturally branch by creating multiple child changes of the same parent change.
This enables multiple team members to work simultaneously.

This branches don't have names.
You can [bookmark](/concepts/bookmarks) the most recent change in your branche to easily switch between them.
[Bookmarks](/concepts/bookmarks) also enable easy sharing of work.

When you specify more than one parent, you merge the work of those parant changes together.
There is no special merge-commit.

A merge might lead to a [conflict](/concepts/conflicts).

## Identifier

Every change gets a unique name.
This name is automatically generated on creation.
It never changes.

The name is long, but you won't have to type it out every time.
Pogo tells you what part of the name (prefix) is enough to uniquely identify the change.
This is called the "uniquely identifying prefix".

The change name is randomly generated and base32 encoded.
The base32 alphabet is limited to only unambiguous characters in every font.

On some fonts, characters like `l`, `1` and `I` or `0` and `O` look the same.
To avoid confusion, Pogo uses only characters that are unambiguous, no matter how weired your font is.
