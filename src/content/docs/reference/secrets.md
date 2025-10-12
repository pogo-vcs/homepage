---
title: secrets
description: Manage repository secrets for CI pipelines
---

Manage secrets that can be accessed in CI pipeline configurations.

Secrets are encrypted values that can be referenced in your CI pipeline YAML
files using the {{ secret "KEY" }} template function. They are useful for
storing sensitive data like API tokens, deployment keys, and credentials.

Secrets are scoped to a repository and can only be accessed by users with
access to that repository.

## Usage

```bash
pogo secrets
```

## secrets delete

Delete a secret from the repository.

This permanently removes the secret. Any CI pipelines that reference this
secret will receive an empty string when accessing it.

## Usage

```bash
pogo secrets delete <key>
```

## Aliases

- `d`
- `rm`
- `remove`

## Examples

```bash
  # Delete a secret
  pogo secrets delete OLD_TOKEN

  # Using the short alias
  pogo secrets d UNUSED_KEY
```

## secrets get

Get the value of a secret by its key.

This will display the secret value in plain text, so be careful when using
this command in shared or recorded terminal sessions.

## Usage

```bash
pogo secrets get <key>
```

## Aliases

- `g`

## Examples

```bash
  # Get a secret value
  pogo secrets get DEPLOY_TOKEN

  # Using the short alias
  pogo secrets g API_KEY
```

## secrets list

List all secrets in the repository.

This shows the keys of all secrets, but not their values for security reasons.

## Usage

```bash
pogo secrets list
```

## Aliases

- `l`

## Examples

```bash
  # List all secrets
  pogo secrets list

  # Using the short alias
  pogo secrets l
```

## secrets set

Set a secret value for the repository.

If a secret with the same key already exists, it will be updated with the
new value. Secrets can be used in CI pipeline configurations.

## Usage

```bash
pogo secrets set <key> <value>
```

## Aliases

- `s`

## Examples

```bash
  # Set a secret
  pogo secrets set DEPLOY_TOKEN abc123xyz

  # Update an existing secret
  pogo secrets set API_KEY new-key-value

  # Using the short alias
  pogo secrets s DATABASE_URL postgres://...
```

