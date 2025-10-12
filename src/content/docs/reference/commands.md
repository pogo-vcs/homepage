---
title: Commands
description: Overview of all Pogo commands and global flags
---

Pogo provides a comprehensive set of commands for version control operations. All commands follow a consistent pattern and provide helpful feedback.

## Global Flags

These flags are available for all commands:

- `--time`: Measure command execution time
- `--verbose`, `-v`: Enable verbose debug logging

## Commands

| Command | Description |
|---------|-------------|
| [bookmark](/reference/bookmark) | Manage bookmarks for changes |
| [ci](/reference/ci) | Manage CI pipelines |
| [clone](/reference/clone) | Clone a repository from a Pogo server |
| [commit](/reference/commit) | Describe, push, and create a new change in one command |
| [completion](/reference/completion) | Generate the autocompletion script for the specified shell |
| [daemon](/reference/daemon) | Manage Pogo daemon service |
| [describe](/reference/describe) | Set the description for the current change |
| [diff](/reference/diff) | Show differences between changes |
| [edit](/reference/edit) | Switch to a different change for editing |
| [gc](/reference/gc) | Run garbage collection on the server |
| [help](/reference/help) | Help about any command |
| [info](/reference/info) | Display the current working copy status |
| [init](/reference/init) | Initialize a new repository on a given Pogo server |
| [invite](/reference/invite) | Manage user invitations |
| [log](/reference/log) | Show the change history |
| [new](/reference/new) | Create a new change based on one or more parent changes |
| [push](/reference/push) | Push all changes to the configured Pogo server |
| [rm](/reference/rm) | Remove a change from the repository |
| [secrets](/reference/secrets) | Manage repository secrets for CI pipelines |
| [serve](/reference/serve) | Start a Pogo server |
| [token](/reference/token) | Manage personal access tokens |
| [visibility](/reference/visibility) | Set repository visibility to public or private |
| [whoami](/reference/whoami) | Show authentication information for the current repository |
