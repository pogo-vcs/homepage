---
title: pogo init
description: Initialize a new Pogo repository
---

The `init` command creates a new Pogo repository in the current directory or connects to an existing repository on the server.

## Synopsis

```bash
pogo init [flags]
```

## Description

Initialize creates a `.pogo` directory in your current location that contains:
- Repository configuration
- Server connection details
- Local cache and metadata

If the repository already exists on the server, `init` will connect to it. Otherwise, it creates a new repository.

## Options

### --name

Repository name on the server.

```bash
pogo init --name my-project
```

- **Type**: string
- **Required**: Yes
- **Example**: `my-project`, `team-repo`, `website`

### --server

Pogo server address in `host:port` format.

```bash
pogo init --server pogo.company.com:8080
```

- **Type**: string
- **Required**: Yes
- **Default**: None
- **Format**: `hostname:port` or `ip:port`

### --public

Make the repository publicly accessible (no authentication required for read access).

```bash
pogo init --name public-project --server pogo.company.com:8080 --public
```

- **Type**: boolean
- **Default**: false
- **Note**: Write access still requires authentication

### --help

Display help information for the init command.

```bash
pogo init --help
```

## Examples

### Basic Repository

Create a private repository:

```bash
cd my-project
pogo init --name my-project --server localhost:8080
```

### Public Repository

Create a publicly readable repository:

```bash
pogo init --name open-source-project --server pogo.org:8080 --public
```

### Connect to Existing

Connect to an existing repository:

```bash
# If 'website' already exists on server
pogo init --name website --server pogo.company.com:8080
# Connects without creating new repo
```

## Behavior

### New Repository

When creating a new repository:

1. Creates `.pogo` directory
2. Stores configuration in `.pogo/config`
3. Creates repository on server
4. Creates initial empty change
5. Sets working copy to initial change

### Existing Repository

When connecting to existing repository:

1. Creates `.pogo` directory
2. Stores configuration
3. Fetches latest change from server
4. Sets working copy to latest change

### Authentication

After initialization, you'll need to authenticate:

```bash
# Set personal access token
pogo token set
# Enter token when prompted
```

## Files Created

The init command creates these files:

```
.pogo/
├── config          # Repository configuration
├── cache/          # Local object cache
└── metadata        # Working copy metadata
```

## Configuration File

The `.pogo/config` file contains:

```toml
[repository]
name = "my-project"
server = "pogo.company.com:8080"
public = false

[user]
token = "" # Set via 'pogo token set'
```

## Error Handling

Common errors and solutions:

### Repository Already Exists

```
Error: Repository 'my-project' already exists
```

**Solution**: Use a different name or connect to the existing repository.

### Connection Failed

```
Error: Cannot connect to server pogo.company.com:8080
```

**Solution**: 
- Check server is running
- Verify network connectivity
- Check firewall rules
- Ensure correct port

### Permission Denied

```
Error: Permission denied to create repository
```

**Solution**:
- Ensure you have a valid token
- Check token has create permissions
- Contact server administrator

### Directory Not Empty

```
Error: Directory already contains a .pogo folder
```

**Solution**:
- Remove existing `.pogo` directory
- Or use existing repository

## Best Practices

### Repository Naming

Use clear, descriptive names:
- **Good**: `website`, `mobile-app`, `data-pipeline`
- **Bad**: `proj1`, `test`, `temp`

### Directory Structure

Initialize in the project root:

```bash
cd /path/to/project/root
pogo init --name project --server server:8080
```

### Public vs Private

- Use `--public` for open-source projects
- Keep internal projects private (default)
- Public repos still require auth for writes

### Multiple Repositories

Each directory can only have one repository:

```bash
# ✅ Correct: Separate directories
/projects/website/      # pogo init --name website
/projects/mobile-app/   # pogo init --name mobile-app

# ❌ Wrong: Nested repositories
/projects/              # pogo init --name projects
/projects/website/      # pogo init --name website (fails)
```

## Environment Variables

You can set defaults via environment:

```bash
export POGO_SERVER=pogo.company.com:8080

# Now only need to specify name
pogo init --name my-project
```

## Integration

### Git Ignore

Add `.pogo` to `.gitignore` if using Git alongside:

```bash
echo ".pogo/" >> .gitignore
```

### CI/CD

Initialize in CI pipelines:

```yaml
# GitHub Actions example
- name: Initialize Pogo
  run: |
    pogo init --name ${{ github.repository }} --server ${{ secrets.POGO_SERVER }}
    echo "${{ secrets.POGO_TOKEN }}" | pogo token set --stdin
```

### Docker

Initialize in containers:

```dockerfile
FROM node:16
WORKDIR /app
RUN pogo init --name app --server pogo:8080
```

## Related Commands

- [`pogo token`](/reference/token) - Set authentication after init
- [`pogo info`](/reference/info) - Check repository status
- [`pogo whoami`](/reference/whoami) - Verify authentication
- [`pogo edit`](/reference/edit) - Switch to different change

## Next Steps

After initializing a repository:

1. Set your authentication token: `pogo token set`
2. Describe your first change: `pogo describe -m "Initial setup"`
3. Start adding files and push: `pogo push`
4. See [Getting Started](/guides/getting-started) for a complete workflow