---
title: init
description: Initialize a new repository on a given Pogo server
---

Initialize a new Pogo repository in the current directory.

This command creates a new repository on the specified Pogo server and configures
the current directory to track it. A .pogo.db file will be created to store
the repository configuration.

The repository can be made public (read-only access for everyone) or kept private
(requires authentication for all access).

## Usage

```bash
pogo init
```

## Flags

- `--name` <string>: repository name
- `--public`: make repository public
- `--server` <string>: host:port

## Examples

```bash
# Initialize a private repository
pogo init --server localhost:8080 --name my-project

# Initialize a public repository
pogo init --server pogo.example.com:8080 --name open-source-project --public
```

