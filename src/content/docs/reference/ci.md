---
title: ci
description: Manage CI pipelines
---

Commands for working with CI pipelines

## Usage

```bash
pogo ci
```

## ci test

Test a CI pipeline configuration by executing it with a synthetic event.

This command allows you to test your CI pipeline locally before pushing it to the server.
It will execute the pipeline using the same logic as the server would, allowing you to verify
that your configuration works as expected.

The config file should be a YAML file in the .pogo/ci/ directory.
If no config file is specified, all CI config files in .pogo/ci/ will be tested.

## Usage

```bash
pogo ci test [config-file]
```

## Flags

- `--archive-url`, `-a` <string>: Archive URL for the event (default: `https://example.com/archive`)
- `--event-type`, `-t` <string>: Event type to simulate (push or remove) (default: `push`)
- `--rev`, `-r` <string>: Revision name for the event (default: `main`)

