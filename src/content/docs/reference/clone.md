---
title: clone
description: Clone a repository from a Pogo server
---

Clone a repository from a Pogo server to a local directory.

This command creates a new directory (or uses the specified directory) and downloads
all files from the specified repository. By default, it will download the "main"
bookmark if it exists, otherwise it will use the root change (the first change 
without any parent).

You can specify a specific revision (change name or bookmark) to clone instead of
the default behavior. The revision parameter uses the same fuzzy matching as the
edit command:
- Exact bookmark matches take priority
- Then exact change name matches  
- Finally, change name prefix matches

The cloned repository will be configured to track the original repository, allowing
you to push changes back using the standard Pogo commands.

## Usage

```bash
pogo clone
```

## Flags

- `--dir` <string>: target directory (defaults to repository name)
- `--repo` <string>: repository name
- `--revision` <string>: specific revision to clone (bookmark or change name)
- `--server` <string>: server address (host:port)

## Examples

```bash
# Clone the main bookmark from a repository
pogo clone --server localhost:8080 --repo my-project

# Clone to a specific directory
pogo clone --server pogo.example.com:8080 --repo open-source-project --dir ./my-local-copy

# Clone a specific revision
pogo clone --server localhost:8080 --repo my-project --dir ./project --revision v1.0.0

# Clone a specific change by name
pogo clone --server localhost:8080 --repo my-project --revision KPHRpdJnwyPcLH4a
```

