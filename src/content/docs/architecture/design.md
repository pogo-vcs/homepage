---
title: System Architecture
description: Understanding Pogo's architecture and design decisions
---

Pogo is designed as a centralized version control system with a clear separation between metadata and content storage. This architecture provides simplicity, efficiency, and scalability.

## Core Components

### Server Architecture

The Pogo server consists of three main components:

1. **PostgreSQL Database**: Stores all metadata about repositories, changes, files, and bookmarks
2. **Object Store**: File system-based storage for actual file contents
3. **gRPC API**: Provides the interface for client-server communication

### Client Architecture

The Pogo client is a single binary that handles:

- Working copy management
- Change tracking and description
- Communication with the server
- Local caching for performance

## Data Model

### Changes

Changes are the fundamental unit in Pogo. Each change represents a snapshot of the repository at a point in time.

```
Change
├── ID (auto-generated)
├── Description
├── Parent Changes (0 or more)
├── Child Changes (0 or more)
└── Files (snapshot of all files)
```

### Bookmarks

Bookmarks are human-readable names that point to specific changes:

- `main`: Special bookmark treated as the default branch
- Version tags: `v1.0.0`, `v2.1.3`, etc.
- Feature markers: Any custom name

### Files

Files are stored with:
- Content hash (SHA-256)
- Path within the repository
- Mode (permissions)
- Size

## Storage Strategy

### Metadata Storage

All metadata is stored in PostgreSQL tables:

- `repositories`: Repository information
- `changes`: Change history and relationships
- `files`: File metadata and associations
- `bookmarks`: Named references to changes
- `objects`: Object store references

### Content Storage

File contents are stored in the object store:

```
objects/
├── aa/
│   └── aa1234567890abcdef...
├── ab/
│   └── ab9876543210fedcba...
└── ...
```

Files are:
- Named by their SHA-256 hash
- Stored in a two-level directory structure
- Deduplicated across all repositories
- Compressed when beneficial

## Communication Protocol

Pogo uses gRPC for client-server communication:

### Key Operations

1. **Push**: Upload changes and file contents
2. **Pull**: Download changes and file contents
3. **Query**: Get repository information
4. **Bookmark**: Manage named references

### Authentication

- Personal Access Tokens (PATs) for user authentication
- Stored securely in system keyring on client
- Transmitted via gRPC metadata

## Design Decisions

### Why Centralized?

1. **Simplicity**: Single source of truth eliminates complexity
2. **Consistency**: No merge conflicts between distributed copies
3. **Control**: Organizations maintain full control over their data
4. **Performance**: Optimized for common workflows

### Why PostgreSQL?

1. **Reliability**: Battle-tested database with ACID guarantees
2. **Querying**: Rich SQL capabilities for complex operations
3. **Scalability**: Handles millions of files efficiently
4. **Ecosystem**: Extensive tooling and monitoring options

### Why Object Store?

1. **Efficiency**: Deduplication saves significant space
2. **Simplicity**: File system is reliable and easy to backup
3. **Flexibility**: Can be replaced with S3-compatible storage
4. **Performance**: Direct file access without database overhead

## Scalability Considerations

### Database Scaling

- Indexes on frequently queried columns
- Partitioning for large tables
- Read replicas for query distribution

### Object Store Scaling

- Sharding across multiple volumes
- CDN integration for distributed teams
- S3-compatible backend for cloud deployment

### Garbage Collection

Adaptive GC strategy based on repository size:
- Small repos: In-memory processing
- Large repos: Batch processing with constant memory

## Security Model

### Access Control

- Repository-level permissions
- Token-based authentication
- Optional LDAP/SSO integration

### Data Protection

- SHA-256 content verification
- Optional encryption at rest
- TLS for all network communication

## Future Enhancements

Planned architectural improvements:

1. **Distributed Object Store**: S3-compatible backend support
2. **Caching Layer**: Redis for frequently accessed metadata
3. **Federation**: Multiple servers with replication
4. **Streaming**: Large file support with chunked transfers