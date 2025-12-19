---
title: assets
description: Manage repository assets (release binaries, etc.)
---

Manage assets associated with the repository.

Assets are files that can be uploaded and downloaded from the server,
typically used for release binaries, documentation, or other artifacts
produced by CI pipelines.

Assets are stored per-repository and can be accessed publicly via HTTP.
Writing and deleting assets requires authentication.

## Usage

```bash
pogo assets
```

## assets delete

Delete an asset from the repository.

This permanently removes the asset from the server.

## Usage

```bash
pogo assets delete <name>
```

## Aliases

- `d`
- `rm`
- `remove`

## Examples

```bash
  # Delete an asset
  pogo assets delete release/v0.9/binary

  # Using the short alias
  pogo assets rm old-release.tar.gz
```

## assets get

Download an asset and write its contents to stdout.

This is useful for piping asset contents to other commands or for
inspecting small text-based assets.

## Usage

```bash
pogo assets get <name>
```

## Aliases

- `g`
- `cat`

## Examples

```bash
  # Download an asset to stdout
  pogo assets get release/v1.0/binary

  # Save to a file
  pogo assets get release/v1.0/binary > binary

  # Using the short alias
  pogo assets cat README.md
```

## assets list

List all assets in the repository.

This shows all uploaded assets with their names/paths.

## Usage

```bash
pogo assets list
```

## Aliases

- `l`
- `ls`

## Examples

```bash
  # List all assets
  pogo assets list

  # Using the short alias
  pogo assets ls
```

## assets put

Upload an asset to the repository.

If a file path is provided, the file's contents are uploaded.
If no file is provided, the asset content is read from stdin.

Asset names can contain slashes to create a directory-like structure
(e.g., "release/v1.0/binary").

## Usage

```bash
pogo assets put <name> [file]
```

## Aliases

- `p`
- `upload`

## Examples

```bash
  # Upload from a file
  pogo assets put release/v1.0/binary ./build/output

  # Upload from stdin
  cat ./build/output | pogo assets put release/v1.0/binary

  # Using the short alias
  pogo assets upload docs/README.md ./README.md
```

