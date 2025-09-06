---
title: Garbage Collection
description: How Pogo manages storage and cleans up unreachable data
---

Pogo includes a sophisticated garbage collection system that automatically removes unreachable data to prevent unbounded storage growth. This ensures your server remains efficient even with long-lived repositories.

## Overview

The GC system cleans up:
- Unreachable changes (not referenced by any bookmark or child)
- Orphaned files (not referenced by any change)
- Unused objects (file contents with no references)

## How It Works

### Mark and Sweep Algorithm

Pogo uses a mark-and-sweep approach:

1. **Mark Phase**: Identify all reachable data
   - Start from bookmarks and repository heads
   - Traverse parent/child relationships
   - Mark all referenced files and objects

2. **Sweep Phase**: Remove unreachable data
   - Delete unmarked changes from database
   - Remove orphaned file entries
   - Clean up unused objects from filesystem

### Adaptive Strategy

The GC automatically selects the best strategy based on data size:

#### Small-Scale Strategy (< 10M files)
- Uses in-memory hash maps
- O(1) lookup performance
- Fastest for smaller repositories

#### Large-Scale Strategy (≥ 10M files)
- Batch processing approach
- Constant memory usage
- Scales to billions of files

The threshold can be configured:
```bash
export GC_MEMORY_THRESHOLD=50000000  # 50 million files
```

## Running Garbage Collection

### Manual Execution

Run GC from any repository:
```bash
pogo gc
```

Output shows:
- Number of files processed
- Objects removed
- Space freed
- Execution time

### Automatic Execution

When running `pogo serve`, GC runs automatically:
- **Schedule**: Daily at 3:00 AM server time
- **Logging**: Results logged to server output
- **Non-blocking**: Runs in background

### Docker Deployment

With Docker, GC runs automatically:
```yaml
services:
  pogo:
    image: ghcr.io/pogo-vcs/pogo:alpine
    environment:
      - GC_MEMORY_THRESHOLD=10000000
    volumes:
      - pogo-data:/data
```

## Performance Characteristics

### Memory Usage

| Strategy | Memory Usage | Files Supported |
|----------|-------------|-----------------|
| Small-scale | O(n) | Up to 10M |
| Large-scale | O(1) | Unlimited |

### Execution Time

Typical performance on modern hardware:

| Repository Size | Files | GC Time |
|----------------|-------|---------|
| Small | 10K | < 1s |
| Medium | 1M | 5-10s |
| Large | 100M | 2-5 min |
| Huge | 1B+ | 20-30 min |

### I/O Patterns

- Sequential database reads
- Batched deletions
- Minimal random I/O

## Configuration

### Environment Variables

```bash
# Memory threshold for strategy selection
GC_MEMORY_THRESHOLD=10000000

# Batch size for large-scale processing
GC_BATCH_SIZE=10000

# Enable verbose logging
GC_VERBOSE=true

# Dry run mode (no deletions)
GC_DRY_RUN=true
```

### Server Configuration

In `pogo.yaml`:
```yaml
gc:
  enabled: true
  schedule: "0 3 * * *"  # Cron expression
  memory_threshold: 10000000
  batch_size: 10000
```

## Safety Features

### Transaction Safety

- All database operations in transactions
- Rollback on any error
- No partial deletions

### Reference Verification

- Double-checks all references
- Preserves bookmarked changes
- Protects active working copies

### Backup Recommendations

Before major GC operations:
1. Backup PostgreSQL database
2. Snapshot object store
3. Test in staging environment

## Monitoring

### Metrics

Track these metrics:
- GC execution frequency
- Objects removed per run
- Space reclaimed
- Execution duration

### Logging

GC logs include:
```
[GC] Starting garbage collection...
[GC] Found 1,234,567 reachable files
[GC] Removed 42,000 unreachable files
[GC] Freed 8.5 GB of storage
[GC] Completed in 45.2 seconds
```

### Alerts

Set up monitoring for:
- GC failures
- Excessive execution time
- Low disk space
- High deletion rates

## Troubleshooting

### GC Takes Too Long

1. Check repository size:
   ```bash
   pogo info --stats
   ```

2. Adjust memory threshold:
   ```bash
   export GC_MEMORY_THRESHOLD=50000000
   ```

3. Run during off-hours:
   ```bash
   pogo gc --schedule "0 2 * * SUN"
   ```

### GC Fails

Common causes:
- **Database locks**: Check for long-running queries
- **Disk space**: Ensure sufficient free space
- **Permissions**: Verify file system permissions

### Excessive Deletions

If GC removes too much:
1. Run with dry-run first:
   ```bash
   GC_DRY_RUN=true pogo gc
   ```

2. Check bookmark health:
   ```bash
   pogo bookmark list --verify
   ```

3. Verify repository integrity:
   ```bash
   pogo verify --deep
   ```

## Best Practices

### Regular Maintenance

- Run GC weekly for active repositories
- Monthly for archival repositories
- After large deletions or cleanups

### Storage Planning

- Monitor growth trends
- Plan for 20% free space
- Consider archiving old changes

### Performance Optimization

- Run GC during low-activity periods
- Use SSD storage for object store
- Optimize PostgreSQL configuration

## Implementation Details

### Database Queries

The GC uses efficient queries:
```sql
-- Find reachable changes
WITH RECURSIVE reachable AS (
  SELECT id FROM changes WHERE id IN (
    SELECT change_id FROM bookmarks
    UNION
    SELECT head_id FROM repositories
  )
  UNION
  SELECT c.id FROM changes c
  JOIN reachable r ON c.parent_id = r.id
)
SELECT * FROM reachable;
```

### Object Store Cleanup

Objects are removed in batches:
1. Build list of unreferenced hashes
2. Delete in groups of 1000
3. Verify deletion success
4. Update database records

### Concurrency Control

- Read-only during mark phase
- Exclusive locks during sweep
- Minimal impact on normal operations