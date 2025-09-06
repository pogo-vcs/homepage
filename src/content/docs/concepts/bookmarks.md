---
title: Bookmarks
description: Using bookmarks to mark and reference important changes
---

Bookmarks in Pogo are lightweight references to specific changes, similar to tags in other version control systems but more flexible.

## What are Bookmarks?

Bookmarks are:
- **Named pointers** to specific changes
- **Moveable** references (unlike immutable tags)
- **Human-readable** alternatives to change IDs
- **Version markers** for releases and milestones

## Key Concepts

### Bookmarks vs Branches

Unlike traditional branches, bookmarks in Pogo:
- Don't create separate development lines
- Are just labels on existing changes
- Can be moved to different changes
- Don't affect the change graph structure

### The "main" Bookmark

The `main` bookmark is special:
- Acts as the default development head
- Similar to master/main in Git
- Used as default parent for new changes
- Should point to the latest stable development

## Working with Bookmarks

### Setting Bookmarks

```bash
# Set bookmark on current change
pogo bookmark set bookmark-name

# Set bookmark on specific change
pogo bookmark set bookmark-name change-id

# Move existing bookmark
pogo bookmark set main abc123
```

### Listing Bookmarks

```bash
# List all bookmarks
pogo bookmark list

# Output format:
# bookmark-name -> change-id
# main -> abc123
# v1.0.0 -> def456
# staging -> ghi789
```

### Using Bookmarks

Reference bookmarks anywhere you'd use a change ID:

```bash
# Switch to bookmarked change
pogo edit main

# Create new change from bookmark
pogo edit v1.0.0
pogo new

# View history from bookmark
pogo log --from main
```

## Bookmark Conventions

### Version Bookmarks

Use semantic versioning for releases:

```bash
pogo bookmark set v1.0.0    # Major release
pogo bookmark set v1.0.1    # Patch release
pogo bookmark set v2.0.0-beta # Pre-release
```

### Environment Bookmarks

Track deployment states:

```bash
pogo bookmark set production  # Currently in production
pogo bookmark set staging     # In staging environment
pogo bookmark set development # Active development
```

### Feature Bookmarks

Mark feature milestones:

```bash
pogo bookmark set feature-auth-complete
pogo bookmark set pre-refactor
pogo bookmark set post-migration
```

## Bookmark Strategies

### Linear Development

Simple project with linear history:

```
root -> change1 -> change2 -> change3
                                 ↑
                               main
```

Move `main` forward as you progress:

```bash
pogo bookmark set main  # After each stable change
```

### Release Management

Track multiple versions:

```
root -> v1.0.0 -> v1.0.1 -> v1.1.0 -> main
           ↑         ↑         ↑        ↑
        stable    hotfix    feature  development
```

```bash
# Development continues on main
pogo bookmark set main

# Mark releases
pogo bookmark set v1.1.0
pogo bookmark set stable v1.1.0

# Hotfix on older version
pogo edit v1.0.0
pogo new
# ... fix bug ...
pogo bookmark set v1.0.1
```

### Feature Development

Track feature branches:

```
main -> feature-start -> feature-done -> main-updated
   ↑                                          ↑
 main                                    main (moved)
```

```bash
# Start feature
pogo new
pogo bookmark set feature-x-start

# Complete feature
pogo bookmark set feature-x-done

# Update main
pogo bookmark set main
```

## Best Practices

### Naming Conventions

**Use Clear Names**
- Version: `v1.0.0`, `v2.1.3`
- Environment: `production`, `staging`
- Features: `feature-name-status`
- Milestones: `before-refactor`, `after-migration`

**Avoid**
- Generic names: `latest`, `current`
- Personal names: `johns-work`
- Temporary names: `temp`, `test`

### Bookmark Maintenance

**Regular Updates**
- Move `main` after stable changes
- Update environment bookmarks after deployments
- Clean up obsolete feature bookmarks

**Documentation**
- Document bookmark conventions in README
- List important bookmarks in project docs
- Include bookmark info in release notes

### Version Management

**Semantic Versioning**
```bash
# Major version (breaking changes)
pogo bookmark set v2.0.0

# Minor version (new features)
pogo bookmark set v1.1.0

# Patch version (bug fixes)
pogo bookmark set v1.0.1

# Pre-releases
pogo bookmark set v2.0.0-beta.1
pogo bookmark set v2.0.0-rc.1
```

## Advanced Usage

### Bookmark Patterns

**Parallel Releases**

Maintain multiple version lines:

```bash
# Main development
pogo bookmark set v2.0.0-dev

# Stable release
pogo bookmark set v1.5.0

# LTS version
pogo bookmark set v1.0-lts
```

**Feature Flags**

Track feature availability:

```bash
pogo bookmark set with-feature-x
pogo bookmark set without-feature-x
```

### Automation with Bookmarks

**CI/CD Integration**

```bash
# Deploy specific bookmark
deploy_version() {
  pogo edit $1
  ./deploy.sh
}

deploy_version production
```

**Release Scripts**

```bash
# Create release
release() {
  version=$1
  pogo bookmark set v$version
  pogo bookmark set stable v$version
  echo "Released version $version"
}

release 1.2.0
```

## Go Module Integration

Bookmarks work seamlessly with Go modules:

```go
// Import specific version
import "your-server.com/your-repo@v1.0.0"

// Import main (default)
import "your-server.com/your-repo"
```

The server automatically serves the correct version based on bookmarks.

## Bookmark Commands Reference

### Set

```bash
pogo bookmark set <name> [change-id]
```

Options:
- `name`: Bookmark name (required)
- `change-id`: Target change (optional, defaults to current)

### List

```bash
pogo bookmark list
```

Options:
- `--format`: Output format (table, json, csv)

### Delete (when implemented)

```bash
pogo bookmark delete <name>
```

### Rename (when implemented)

```bash
pogo bookmark rename <old> <new>
```

## Troubleshooting

### Bookmark Conflicts

If bookmark already exists:
```bash
# Force move bookmark
pogo bookmark set main abc123 --force
```

### Lost Bookmarks

To find unbookmarked important changes:
```bash
# View all changes
pogo log --all

# Re-bookmark important changes
pogo bookmark set recovered-work xyz789
```

### Bookmark Standards

Establish team conventions:
- Document in `CONTRIBUTING.md`
- Use consistent naming
- Regular bookmark audits
- Automated bookmark validation

## Next Steps

- Understand [Conflicts](/concepts/conflicts)
- Learn [Basic workflows](/guides/basic-workflow)
- Explore [Server setup](/guides/server-setup)
- See [bookmark command reference](/reference/bookmark)