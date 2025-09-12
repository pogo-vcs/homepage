---
title: Shell Integration
description: How to integrate Pogo into your shell
---

## Command Prompt

You can run `pogo info` to get the current Pogo status to stdout. This can be used in a command prompt to display the current Pogo status.

Example for Fish:

```fish
function fish_vcs_prompt --description 'Print all vcs prompts'
    pogo info $argv # Run pogo info
    or fish_git_prompt $argv # Fallback to other VCSs
    or fish_hg_prompt $argv
    or fish_fossil_prompt $argv
end
```

## Completion

The Pogo binary includes completion scripts for Bash, Zsh, Fish, and PowerShell.

### Fish

```fish
pogo completion fish | source
```

To load completions for every new session, execute once:

```fish
pogo completion fish > ~/.config/fish/completions/pogo.fish
```

### Zsh

If shell completion is not already enabled in your environment you will need to enable it.
You can execute the following once:

```zsh
echo "autoload -U compinit; compinit" >> ~/.zshrc
```

To load completions in your current shell session:

```zsh
source <(pogo completion zsh)
```

To load completions for every new session, execute once:

Linux:

```zsh
pogo completion zsh > "${fpath[1]}/_pogo"
```

macOS:

```zsh
pogo completion zsh > $(brew --prefix)/share/zsh/site-functions/_pogo
```

### Bash

To load completions in your current shell session:

```bash
source <(pogo completion bash)
```

To load completions for every new session, execute once:

Linux:

```bash
pogo completion bash > /etc/bash_completion.d/pogo
```

macOS:

```bash
pogo completion bash > $(brew --prefix)/etc/bash_completion.d/pogo
```

### PowerShell

To load completions in your current shell session:

```powershell
pogo completion powershell | Out-String | Invoke-Expression
```

To load completions for every new session, add the output of the above command to your powershell profile.
