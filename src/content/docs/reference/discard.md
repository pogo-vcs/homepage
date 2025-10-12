---
title: discard
description: Discard local changes and revert to remote state
---

Discard all local modifications and revert to the state of the currently 
checked out change as it exists on the remote server.

This is equivalent to running 'pogo edit' with the current change name, 
effectively re-downloading the change from the server and overwriting any 
local modifications.

## Usage

```bash
pogo discard
```

## Examples

```bash
# Discard all local changes
pogo discard
```

