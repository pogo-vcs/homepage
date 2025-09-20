---
title: Quick Start
description: Learn how to get started with Pogo version control
---

Welcome to Pogo! This guide will walk you through the basics of using Pogo for version control.

## Watch the intro video

<iframe
  class="video-frame"
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/W6-YJHy7_A8?si=lLbdbEdpzg2n_79Z"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

## Install client

The recommended way to install Pogo is with [Homebrew](https://brew.sh). Prebuilt binaries are available for macOS and Linux (both x64 and arm64).

```bash
brew install --cask pogo-vcs/tap/pogo
```

For other installation methods, see the [Installation Guide](/guides/installation).

## Set up a Server

The easiest way to get your own Pogo server is by using [Docker](https://www.docker.com). A prebuilt image is available at `ghcr.io/pogo-vcs/pogo:alpine` which runs on x64 and arm64 architectures with Linux kernals.

On the first run, Pogo server will create a Root user with one random personal access token and print it to stdout.
Use this token to log in to the server.
After the first run, the token will never be shown again.

The port can be confugured using the `PORT` environment variable. The default is `8080`.
Make sure you add a reverse proxy with SSL certificates in front of the Pogo server if you intend to make it publicly accessible.

## Your First Repository

### 1. Initialize a Repository

Navigate to your project directory and initialize a new Pogo repository:

```bash
cd my-project
pogo init --name my-project --server your-server.com:8080
```

This creates a `.pogo.yaml` file that tracks your repository configuration.

### 2. Authenticate

When prompted, enter your personal access token. This will be securely stored in your system keyring. To see your token, run:

```bash
pogo whoami
```

You can remove your token by running:

```bash
pogo token remove --server your-server.com:8080
```

### 3. Describe Your Changes

A new repository starts with a single change with the description "init". You can create a new change by running:

```bash
pogo new
```

Before writing any code, describe what you're planning to do:

```bash
pogo describe
```

This will open a description form to write a [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) message. This helps you think through your changes and provides context for others.
You can also use the `--message` flag to provide a commit message directly:

```bash
pogo describe --message "feat: add initial project structure"
```

### 4. Make Your Changes

Now work on your files as you normally would:

```bash
echo "# My Project" > README.md
mkdir src
echo "console.log('Hello, Pogo!');" > src/index.js
```

### 5. Push Your Changes

Send your changes to the server:

```bash
pogo push
```

You can push as often as you like - each push overwrites the current change until you create a new one.

You cannot overwrite a change that has children or is pointed to by a bookmark.

### 6. Set a Bookmark

Mark important versions with bookmarks:

```bash
pogo bookmark set main
```

This sets the current change as the "main" bookmark. "main" is a special bookmark that represents the current development state. It is treated similar to the default branch in Git.

## Understanding the Workflow

Pogo's workflow is designed to be simple and iterative:

1. **Describe First**: Document your intentions before starting work
2. **Work and Push**: Make changes and push frequently without worrying about "commits"
3. **Iterate**: Update your description as your implementation evolves
4. **Finalize**: Create a new change when you're ready to move on
5. **Bookmark**: Mark important milestones for easy reference

## Viewing History

Check your repository's history with:

```bash
pogo log
```

This shows the relationship between changes, including parent-child relationships and bookmarks.

By default, log shows the last 10 changes. You can use the `-n` flag to specify a different number of changes to show.

## Next Steps

- Learn about [Pogo's core concepts](/concepts/overview)
- Set up your own [Pogo server](/guides/server-setup)
- Explore the [CLI reference](/reference/commands)
- Understand [conflict resolution](/concepts/conflicts)

## Getting Help

- Check the [CLI reference](/reference/commands) for detailed command documentation
- Report issues on [GitHub](https://github.com/pogo-vcs/pogo/issues)
- Join the community discussions on GitHub
