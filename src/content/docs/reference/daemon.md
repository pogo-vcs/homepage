---
title: daemon
description: Manage Pogo daemon service
---

Manage the Pogo daemon service for automatic operations.

This is currently only implemented for macOS. Windows and Linux will follow soon.

The daemon service can be installed to run automatically and provides
background functionality for Pogo operations.

This daemon is not required but it allows for automatic pushing of any changes.
You can tweak its behaviour by editing the global configuration file which is located at your system's default config directory.

## Usage

```bash
pogo daemon
```

## Aliases

- `service`

## daemon install

Install the Pogo daemon service to run automatically.

This will create the necessary service configuration files and register
the daemon with the system service manager.

## Usage

```bash
pogo daemon install
```

## daemon start

Start the Pogo daemon service process.

This command starts the daemon and waits for it to gracefully shutdown.

## Usage

```bash
pogo daemon start
```

## daemon stop

Stop the Pogo daemon service process.

This command stops the daemon and waits for it to gracefully shutdown.

## Usage

```bash
pogo daemon stop
```

## daemon uninstall

Uninstall the Pogo daemon service from the system.

This will remove the service configuration files and unregister the daemon
with the system service manager.

## Usage

```bash
pogo daemon uninstall
```

