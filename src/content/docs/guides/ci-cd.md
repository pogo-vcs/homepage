---
title: CI/CD Integration
description: How to integrate Pogo with your CI/CD pipeline
---

Pogo provides flexible CI/CD integration through both webhooks and container-based pipelines, similar to GitLab CI.

## Overview

Pogo supports two types of CI tasks:

1. **Webhook tasks** - Trigger external CI/CD tools via HTTP requests
2. **Container tasks** - Run Docker containers directly on the Pogo server (requires Docker)

Both task types can be used together in the same configuration file.

## Config Files

CI files must be located in `.pogo/ci/*.{yaml,yml}` and can be named anything you want.

### Go Templates

Go templates can be used anywhere in the file. All default functions are available, plus:

- `toUpper`: converts a string to uppercase
- `toLower`: converts a string to lowercase
- `trim`: trims whitespace from the beginning and end of a string
- `btoa`: base64 encodes a string
- `atob`: base64 decodes a string

Available data from the Go template:

- `Rev`: name of the revision that triggered the webhook
- `ArchiveUrl`: URL to download the archive of the revision as a zip file (authentication required for private repos)

## Task Types

### Webhook Tasks

Webhook tasks send HTTP requests to external services when triggered.

```yaml
version: 1
on:
  push:
    bookmarks: ["v*"]
do:
  - type: webhook
    webhook:
      url: https://ci.example.net/job/deploy-release/buildWithParameters
      method: POST
      headers:
        Content-Type: application/json
        Authorization: Bearer ${DEPLOY_TOKEN}
      body: '{"VERSION": "{{.Rev}}", "ZIP": "{{.ArchiveUrl}}"}'
      retry_policy:
        max_attempts: 3
```

**Webhook Configuration:**

- `url` (required): The HTTP endpoint to call
- `method` (required): HTTP method (GET, POST, PUT, DELETE, etc.)
- `headers` (optional): HTTP headers to include
- `body` (optional): Request body
- `retry_policy` (optional): Retry configuration
  - `max_attempts`: Number of attempts before giving up

### Container Tasks

Container tasks run Docker containers on the Pogo server. The repository content is automatically mounted at `/workspace` (read-only).

```yaml
version: 1
on:
  push:
    bookmarks: ["main"]
do:
  - type: container
    container:
      image: node:20-alpine
      working_dir: /workspace
      commands:
        - npm ci
        - npm test
      environment:
        NODE_ENV: test
```

**Container Configuration:**

- `image` (required): Docker image to use (from registry or Dockerfile path)
- `commands` (optional): Commands to run inside the container
- `environment` (optional): Environment variables to set
- `working_dir` (optional): Working directory (defaults to `/workspace` if repo content is available)
- `services` (optional): Additional containers to run alongside (see Services section)

### Services

Services are additional containers that run alongside your main container, connected via a Docker network. This is useful for databases, cache servers, or other dependencies.

```yaml
version: 1
on:
  push:
    bookmarks: ["main"]
do:
  - type: container
    container:
      image: node:20-alpine
      services:
        - name: postgres
          image: postgres:16-alpine
          environment:
            POSTGRES_PASSWORD: testpass
            POSTGRES_DB: testdb
        - name: redis
          image: redis:7-alpine
      environment:
        DATABASE_URL: postgresql://postgres:testpass@postgres:5432/testdb
        REDIS_URL: redis://redis:6379
      commands:
        - npm ci
        - npm test
```

Services are accessible by their `name` as the hostname (e.g., `postgres`, `redis`). The main container decides when the pipeline completes.

**Service Configuration:**

- `name` (required): Service name (used as hostname in network)
- `image` (required): Docker image to use
- `environment` (optional): Environment variables for the service

## Events

CI pipelines are triggered by bookmark events:

### Push Events

Triggered when a bookmark is created or updated:

```yaml
on:
  push:
    bookmarks:
      - main           # Exact match
      - v*             # Glob pattern (e.g., v1.0.0, v2.1.3)
      - release-*      # Any bookmark starting with "release-"
```

### Remove Events

Triggered when a bookmark is deleted:

```yaml
on:
  remove:
    bookmarks:
      - temp-*         # Clean up when temporary bookmarks are removed
```

### Multiple Events

You can listen to both push and remove events:

```yaml
version: 1
on:
  push:
    bookmarks: ["main", "v*"]
  remove:
    bookmarks: ["temp-*"]
do:
  - type: webhook
    webhook:
      url: https://api.example.com/webhook
      method: POST
```

## Testing Pipelines Locally

Before pushing CI configurations to the server, test them locally with the `pogo ci test` command:

```bash
# Test a specific config file
pogo ci test .pogo/ci/build.yaml

# Test all CI configs in .pogo/ci/
pogo ci test

# Test with custom event parameters
pogo ci test --event-type push --rev feature-branch

# Test a remove event
pogo ci test --event-type remove --rev temp-123
```

The test command executes your pipeline using the same logic as the server, mounting your current directory at `/workspace` for container tasks.

## Complete Examples

### Build and Test with Multiple Services

```yaml
version: 1
on:
  push:
    bookmarks: ["main", "dev"]
do:
  - type: container
    container:
      image: node:20-alpine
      services:
        - name: postgres
          image: postgres:16-alpine
          environment:
            POSTGRES_PASSWORD: test
            POSTGRES_DB: testdb
        - name: redis
          image: redis:7-alpine
      environment:
        DATABASE_URL: postgresql://postgres:test@postgres:5432/testdb
        REDIS_URL: redis://redis:6379
        NODE_ENV: test
      commands:
        - npm ci
        - npm run db:migrate
        - npm test
        - npm run build
```

### Multi-stage Pipeline (Build, Test, Deploy)

```yaml
version: 1
on:
  push:
    bookmarks: ["v*"]
do:
  # Build and test
  - type: container
    container:
      image: golang:1.22-alpine
      commands:
        - go mod download
        - go test ./...
        - go build -o app .
  
  # Notify deployment system
  - type: webhook
    webhook:
      url: https://deploy.example.com/api/deploy
      method: POST
      headers:
        Authorization: Bearer ${DEPLOY_TOKEN}
        Content-Type: application/json
      body: |
        {
          "version": "{{.Rev}}",
          "archive": "{{.ArchiveUrl}}",
          "timestamp": "{{now.Unix}}"
        }
      retry_policy:
        max_attempts: 3
```

### Conditional Deployment

```yaml
version: 1
on:
  push:
    bookmarks: ["v*"]           # Only deploy on version tags
do:
  - type: container
    container:
      image: alpine:latest
      commands:
        - apk add --no-cache curl
        - |
          curl -X POST https://api.example.com/deploy \
            -H "Authorization: Bearer $DEPLOY_TOKEN" \
            -d "version={{.Rev}}"
      environment:
        DEPLOY_TOKEN: ${SECRET_TOKEN}
```

### Custom Dockerfile

If you need a custom build environment, reference a Dockerfile from your repository:

```yaml
version: 1
on:
  push:
    bookmarks: ["main"]
do:
  - type: container
    container:
      image: ./Dockerfile  # Path to Dockerfile in repo
      commands:
        - make test
        - make build
```

## Docker Requirements

Container tasks require Docker to be available on the Pogo server:

1. **Docker Socket**: Pogo checks `DOCKER_HOST` environment variable, then system defaults:
   - Unix/Linux/macOS: `unix:///var/run/docker.sock`
   - Windows: `npipe:////./pipe/docker_engine`

2. **Docker CLI**: If no socket is available, Pogo falls back to using the `docker` CLI command

3. **Podman**: Podman is supported as it provides Docker-compatible socket and CLI

If Docker is not available, container tasks will fail. Webhook tasks will continue to work normally.

## Schema Validation

Your Pogo server provides JSON and XML schemas for validation:

- JSON Schema: `https://your-pogo-server/schemas/ci/schema.json`
- XML Schema: `https://your-pogo-server/schemas/ci/schema.xsd`

Use these with your editor for autocomplete and validation while writing CI configurations.

## Security Considerations

1. **Repository Content**: Container tasks mount repository content as read-only at `/workspace`
2. **Services**: Service containers are isolated in a dedicated Docker network
3. **Cleanup**: All containers and networks are automatically cleaned up after execution
4. **Environment Variables**: Use template variables for sensitive data; avoid hardcoding secrets
5. **Image Trust**: Only use Docker images from trusted registries

## Troubleshooting

### Container tasks fail with "docker not available"

Ensure Docker is installed and accessible:

```bash
# Check if Docker is running
docker version

# Check Docker socket (Unix/Linux/macOS)
ls -la /var/run/docker.sock

# Test Pogo's Docker detection
pogo ci test .pogo/ci/test.yaml
```

### Services not accessible from main container

Services take a few seconds to start. If you're getting connection errors, add a wait/retry mechanism:

```yaml
commands:
  - apk add --no-cache curl
  - |
    until curl -f http://postgres:5432 2>/dev/null; do
      echo "Waiting for postgres..."
      sleep 1
    done
  - npm test
```

### Repository content not available in container

Ensure your working directory contains a `.pogo` directory when running `pogo ci test`. The repository content is mounted at `/workspace` only when available.

