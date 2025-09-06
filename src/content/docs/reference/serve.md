---
title: serve
description: Start a Pogo server
---

Start a Pogo server to host repositories and handle client connections.

The server provides:
- gRPC API for Pogo clients (version control operations)
- HTTP web interface for browsing repositories
- Go module proxy support for importing Pogo repos as Go modules
- Automatic daily garbage collection at 3 AM
- PostgreSQL backend for metadata storage
- File-based object storage for content

Configuration:
  The server can be configured through environment variables:
- HOST - Full host:port binding (e.g., "0.0.0.0:8080")
- PORT - Port number only (binds to all interfaces)
- DATABASE_URL - PostgreSQL connection string
- OBJECT_STORAGE_PATH - Directory for storing file objects
- GC_MEMORY_THRESHOLD - File count threshold for GC strategy

The server requires a PostgreSQL database to be running and accessible.
On first run, it will automatically set up the required database schema.

Security:
- Authentication via personal access tokens
- Public repositories allow read-only access without auth
- All write operations require authentication

## Usage

```bash
pogo serve
```

## Examples

```bash
# Start server on default port 8080
pogo serve

# Start server on custom port
PORT=3000 pogo serve

# Start server with specific host binding
HOST=192.168.1.100:8080 pogo serve

# Start with PostgreSQL configuration
DATABASE_URL=postgres://user:pass@localhost/pogo pogo serve

# Docker example
docker run -p 8080:8080 -e DATABASE_URL=... ghcr.io/pogo-vcs/pogo:alpine
```

