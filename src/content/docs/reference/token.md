---
title: token
description: Manage personal access tokens
---

Manage personal access tokens stored in the system keyring for different Pogo servers.

Personal access tokens are used to authenticate with Pogo servers. They are
stored securely in your system's keyring/keychain, which means:
- Tokens persist across terminal sessions
- Tokens are encrypted at rest
- Each server has its own token
- Tokens are shared across all repositories on the same server

You typically receive a token from:
- Your system administrator when joining a team
- The server's web interface after logging in
- Another team member (share securely!)

The token is automatically used for all operations with the associated server.

## Usage

```bash
pogo token
```

## token remove

Remove a personal access token for a specific Pogo server from the system keyring.

This will:
- Delete the stored token for the specified server
- Require re-authentication for future operations
- Ask for confirmation before deletion

Use this command when:
- Leaving a team or organization
- Rotating credentials for security
- Troubleshooting authentication issues
- Cleaning up old server configurations

## Usage

```bash
pogo token remove
```

## Flags

- `--server` <string>: Pogo server address (host:port), defaults to server from current repository

## Examples

```bash
# Remove token for current repository's server (run from within repo)
pogo token remove

# Remove token for a specific server
pogo token remove --server old.server.com:8080

# The command will ask for confirmation:
# Are you sure you want to remove the token for old.server.com:8080?
# > Yes
```

## token set

Set or update a personal access token for a specific Pogo server.

The token will be securely stored in your system's keyring/keychain and
automatically used for all future operations with that server.

If run from within a repository, the server address will be automatically
detected. Otherwise, use the --server flag to specify the server.

The command will:
- Prompt you to enter the token interactively (for security)
- Validate the token format
- Store it securely in your system keyring
- Confirm successful storage

## Usage

```bash
pogo token set
```

## Flags

- `--server` <string>: Pogo server address (host:port), defaults to server from current repository

## Examples

```bash
  # Set token for current repository's server (run from within repo)
  pogo token set

  # Set token for a specific server
  pogo token set --server pogo.example.com:8080

  # The command will prompt:
  # Enter the personal access token for pogo.example.com:8080
  # > yMq3CR3BvKR6VrXn7TdDmAtt9N6M3x7a
```

