---
title: gc
description: Run garbage collection on the server
---

Run garbage collection on the Pogo server to clean up unreachable data.

Garbage collection removes data that is no longer referenced by any repository,
freeing up disk space and keeping the server storage efficient. This includes:
  • Unreachable file records in the database
  • Orphaned file objects on the filesystem
  • Temporary data from interrupted operations

The GC process is safe and will never remove:
  • Files referenced by any change in any repository
  • Recent uploads (within the safety window)
  • Active bookmarks or their history

The server automatically runs GC daily at 3 AM, but you can trigger it
manually when needed. The operation uses an adaptive strategy that
automatically chooses the most efficient approach based on data size.

Requirements:
  • You must be authenticated to run GC
  • The command must be run from within a Pogo repository

## Usage

```bash
pogo gc
```

## Examples

```bash
pogo gc

# Example output:
# Running garbage collection...
# Garbage collection completed:
#   Database files deleted: 1523
#   Disk files deleted: 1523
#   Bytes freed: 15728640
#   Space freed: 15.00 MB
```

