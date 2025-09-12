---
title: info
description: Display the current working copy status
---

Display information about the current working copy and repository status.

This command is particularly useful for:

- Checking which change you're currently working on
- Seeing if there are any conflicts
- Integrating Pogo status into your shell prompt
- Scripting and automation

The output can be customized using Go's text/template syntax with the --format flag.

Available template variables:  

| Variable                 | Description                                    |
| ------------------------ | ---------------------------------------------- | 
| `{{.ChangeNamePrefix}}`  | The adjective part of the change name          |
| `{{.ChangeNameSuffix}}`  | The noun and number part of the change name    |
| `{{.ChangeName}}`        | The full change name (prefix + suffix)         |
| `{{.ChangeDescription}}` | The description of the current change          |
| `{{.Bookmarks}}`         | Array of bookmarks pointing to this change     |
| `{{.IsInConflict}}`      | Boolean indicating if the change has conflicts |
| `{{.Error}}`             | Any error message (connection issues, etc.)    |

The default format shows a colored prompt-friendly output with conflict
indicators and bookmark information.

Fish shell integration:

```fish
function fish_vcs_prompt --description 'Print all vcs prompts'
    pogo info $argv
    or fish_jj_prompt $argv
    or fish_git_prompt $argv
    or fish_hg_prompt $argv
    or fish_fossil_prompt $argv
end
```

## Usage

```bash
pogo info
```

## Flags

- `--format` <string>: Format string for the prompt output (default: `({{if .Error}}[31m{{.Error}}[0m{{else}}{{if .IsInConflict}}💥{{end}}[35m{{.ChangeNamePrefix}}[90m{{.ChangeNameSuffix}}[0m {{- range $i, $b := .Bookmarks}}{{if $i}}, {{else}} {{end}}{{if eq . "main"}}[32m{{.}}[0m{{else}}{{.}}{{end}}{{end}}{{end}})`)

## Examples

```bash
# Show default formatted info
pogo info

# Simple format showing just the change name
pogo info --format '{{.ChangeName}}'

# Format for shell prompt showing change and bookmarks
pogo info --format '({{.ChangeName}}{{range .Bookmarks}} [{{.}}]{{end}})'

# Show description if available
pogo info --format '{{.ChangeName}}: {{.ChangeDescription}}'

# Bash prompt integration example
export PS1='$(pogo info --format "{{.ChangeName}}") \$ '

# Check for conflicts in a script
pogo info --format '{{.IsInConflict}}'
```

