---
title: Server Setup
description: How to set up and configure a Pogo server
---

This guide covers setting up a Pogo server for your team or organization.

## Prerequisites

- PostgreSQL 17+ database
- Server with at least 2GB RAM
- Storage space for repositories
- Network access on port 8080 or whatever you choose for HTTP and gRPC

## Installation Methods

### Docker (Recommended)

The easiest way to run a Pogo server is with Docker Compose:

```yaml
services:
  pogo:
    image: ghcr.io/pogo-vcs/pogo:alpine
    depends_on:
      - db
    ports:
      - 4321:4321
    environment:
      - PORT=8080
      - DATABASE_URL=postgres://pogo:pogo@db:5432/pogo
      - PUBLIC_ADDRESS=https://pogo.example.com
      volumes:
        - ./pogo_data/:/data/
  db:
    image: postgres:17-alpine
    environment:
      - POSTGRES_USER=pogo
      - POSTGRES_PASSWORD=pogo
      - POSTGRES_DB=pogo
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pogo"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### Binary Installation

Download and run the Pogo binary directly:

Download from [GitHub releases](https://github.com/pogo-vcs/pogo/releases).

```bash
# Run server
DATABASE_URL=postgres://pogo:password@localhost/pogo \
pogo serve
```

### From Source

Build and run from source:

```bash
# Clone and build
git clone https://github.com/pogo-vcs/pogo.git
cd pogo
just build

# Run server
./pogo serve
```

See [Installation guide](/guides/installation) for more details.

## Configuration

### Environment Variables

Configure your Pogo server with these environment variables:

| Variable              | Description                          | Default        |
| --------------------- | ------------------------------------ | -------------- |
| `DATABASE_URL`        | PostgreSQL connection string         | **Required**   |
| `PORT`                | Port                                 | `8080`         |
| `HOST`                | Bind address                         | `0.0.0.0:8080` |
| `GC_MEMORY_THRESHOLD` | File count threshold for GC strategy | `10000000`     |
| `ROOT_TOKEN`          | Personal access token for root user  | Random         |
| `PUBLIC_ADDRESS`      | Public address for HTTP server       | **Required**   |

### Database Setup

Pogo server automatically creates tables on first run and runs migrations if needed.

## Storage Configuration

Pogo server stores files in `./data/`.

## Next Steps

- Configure [Authentication](/guides/authentication)
- Set up [CI/CD integration](/guides/ci-cd)
- Learn about [Garbage Collection](/architecture/garbage-collection)
