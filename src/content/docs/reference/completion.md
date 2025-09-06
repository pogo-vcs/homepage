---
title: completion
description: Generate the autocompletion script for the specified shell
---

Generate the autocompletion script for pogo for the specified shell.
See each sub-command's help for details on how to use the generated script.


## Usage

```bash
pogo completion
```

## completion bash

Generate the autocompletion script for the bash shell.

This script depends on the 'bash-completion' package.
If it is not installed already, you can install it via your OS's package manager.

To load completions in your current shell session:

	source <(pogo completion bash)

To load completions for every new session, execute once:

#### Linux:

	pogo completion bash > /etc/bash_completion.d/pogo

#### macOS:

	pogo completion bash > $(brew --prefix)/etc/bash_completion.d/pogo

You will need to start a new shell for this setup to take effect.


## Usage

```bash
pogo completion bash
```

## Flags

- `--no-descriptions`: disable completion descriptions

## completion fish

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

	pogo completion fish | source

To load completions for every new session, execute once:

	pogo completion fish > ~/.config/fish/completions/pogo.fish

You will need to start a new shell for this setup to take effect.


## Usage

```bash
pogo completion fish
```

## Flags

- `--no-descriptions`: disable completion descriptions

## completion powershell

Generate the autocompletion script for powershell.

To load completions in your current shell session:

	pogo completion powershell | Out-String | Invoke-Expression

To load completions for every new session, add the output of the above command
to your powershell profile.


## Usage

```bash
pogo completion powershell
```

## Flags

- `--no-descriptions`: disable completion descriptions

## completion zsh

Generate the autocompletion script for the zsh shell.

If shell completion is not already enabled in your environment you will need
to enable it.  You can execute the following once:

	echo "autoload -U compinit; compinit" >> ~/.zshrc

To load completions in your current shell session:

	source <(pogo completion zsh)

To load completions for every new session, execute once:

#### Linux:

	pogo completion zsh > "${fpath[1]}/_pogo"

#### macOS:

	pogo completion zsh > $(brew --prefix)/share/zsh/site-functions/_pogo

You will need to start a new shell for this setup to take effect.


## Usage

```bash
pogo completion zsh
```

## Flags

- `--no-descriptions`: disable completion descriptions

