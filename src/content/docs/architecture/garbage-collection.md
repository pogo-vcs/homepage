---
title: Garbage Collection
description: How Pogo manages storage and cleans up unreachable data
---

Pogo includes a sophisticated garbage collection system that automatically removes unreachable data to prevent unbounded storage growth. This ensures your server remains efficient even with long-lived repositories.

Pogo includes an automatic garbage collection system that removes unreachable data to prevent unbounded storage growth. The GC system cleans up both database records and filesystem objects that are no longer referenced by any repository.

## How to Use

- **Manual GC:** Run `pogo gc` from any repository to trigger garbage collection on the server. This requires authentication.
- **Automatic GC:** When running `pogo serve`, garbage collection automatically runs daily at 3:00 AM server time.

## Adaptive Implementation

The garbage collection system uses an adaptive strategy based on the total number of files in the database:

- **Small-scale (< 10 million files):** Uses an in-memory hash map strategy for fast O(1) lookups.
- **Large-scale (≥ 10 million files):** Uses a batch processing strategy that scales to billions of files with constant memory usage.

The threshold can be configured via the `GC_MEMORY_THRESHOLD` environment variable.
