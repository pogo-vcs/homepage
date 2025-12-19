---
title: Installation
description: Multiple ways to install Pogo on your system
---

Pogo can be installed through various package managers or built from source. Choose the method that works best for your platform.

## Package Managers

### NPM

The easiest cross-platform installation method, but the Node.js wrapper might make it slightly slower.
Not recommended for older machines.

```bash
npm install -g @pogo-vcs/pogo
```

### Homebrew (macOS and Linux)

As cask (recommended for macOS):

```bash
brew install --cask pogo-vcs/tap/pogo
```

Or as a formula:

```bash
brew install pogo-vcs/tap/pogo
```

### Scoop (Windows)

```bash
scoop bucket add pogo-vcs https://github.com/pogo-vcs/scoop-bucket.git
scoop install pogo
```

## Building from Source

If you prefer to build Pogo from source or need the latest development version:

### Prerequisites

Before building, ensure you have:

- [Go](https://go.dev/) (1.25 or later)
- [Just](https://github.com/casey/just)
- [Protocol Buffers compiler](https://protobuf.dev/) (Go + gRPC)
- [sqlc](https://sqlc.dev/)
- [pnpm](https://pnpm.io/)
- [templ](https://templ.guide/)

### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/pogo-vcs/pogo.git
   cd pogo
   ```
2. Build the binary:
   ```bash
   just build
   ```
3. The `pogo` binary will be created in the current directory. Move it to your `PATH`.

## Shell Completion

Pogo supports shell completion for better command-line experience.

### Bash

```bash
# Load completion for current session
source <(pogo completion bash)

# Linux - permanent installation
pogo completion bash > /etc/bash_completion.d/pogo

# macOS - permanent installation
pogo completion bash > $(brew --prefix)/etc/bash_completion.d/pogo
```

### Zsh

```bash
# Load completion for current session
source <(pogo completion zsh)

# Permanent installation
pogo completion zsh > "${fpath[1]}/_pogo"
```

### Fish

```bash
# Load completion for current session
pogo completion fish | source

# Permanent installation
pogo completion fish > ~/.config/fish/completions/pogo.fish
```

### PowerShell

```powershell
# Load completion for current session
pogo completion powershell | Out-String | Invoke-Expression

# Add to your PowerShell profile for permanent installation
```

## Verification

After installation, verify that Pogo is working correctly:

```bash
# Check version
pogo --version

# View help
pogo --help

# Test server connectivity (if you have access to a server)
pogo init --name test-repo --server your-server:8080
```

## Updating

### NPM

```bash
npm update -g @pogo-vcs/pogo
```

### Homebrew

```bash
brew upgrade pogo
```

### Scoop

```bash
scoop update pogo
```

### From Source

```bash
cd pogo
git pull
just build
# update the binary in your PATH
```

## Uninstallation

### NPM

```bash
npm uninstall -g @pogo-vcs/pogo
```

### Homebrew

```bash
brew uninstall pogo
```

### Scoop

```bash
scoop uninstall pogo
```

## Troubleshooting

### Command Not Found

If `pogo` is not found after installation:

1. Restart your terminal or reload your shell configuration

2. Check if it's in your PATH:

   ```bash
   which pogo  # Linux/macOS
   where pogo  # Windows
   ```

3. For NPM installations, ensure global npm bin is in PATH:

   ```bash
   npm bin -g
   ```

### Permission Errors

If you encounter permission errors during NPM installation:

```bash
# Use a Node version manager instead of sudo
# Or configure npm to use a different directory
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Build Errors

When building from source:

1. Ensure all prerequisites are installed
2. Check Go version: `go version` (needs 1.25+)
3. Run `go mod tidy` to install Go dependencies
4. Check the [GitHub issues](https://github.com/pogo-vcs/pogo/issues) for known problems

## Next Steps

- Follow the [Getting Started guide](/guides/getting-started)
- Set up a [Pogo server](/guides/server-setup)
- Learn about [authentication](/guides/authentication)
