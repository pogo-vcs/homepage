---
title: whoami
description: Show authentication information for the current repository
---

Show the personal access token being used for authentication with the current repository's server.

This command displays:
- The server URL this repository is connected to
- The personal access token used for authentication

Personal access tokens are stored securely in your system's keyring/keychain
and are associated with specific server URLs. Different repositories on the
same server share the same token.

This command is useful for:
- Debugging authentication issues
- Verifying which credentials are being used
- Checking server connectivity configuration
- Sharing tokens between team members (with caution)

Note: Personal access tokens should be kept secret. Only share them with
trusted team members who need access to the same repositories.

## Usage

```bash
pogo whoami
```

## Examples

```bash
# Show current authentication info
pogo whoami

# Example output:
# Server: pogo.example.com:8080
# Personal Access Token: yMq3CR3BvKR6VrXn7TdDmAtt9N6M3x7a
```

