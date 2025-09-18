---
title: Daemon
description: Pogo's background service
---

The intended workflow is to overwrite a change until you are satisfied with its content.
The Pogo daemon makes this easier.
It listens for file changes and automatically pushes everything to the server.

This is a very experimental feature that is only implemented for macOS.
Linux and Windows will follow once the macOS implementation is stable.

For now, read the daemon documentation by running `pogo help daemon`.