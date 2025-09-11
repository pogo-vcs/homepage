---
title: CI/CD Integration
description: How to integrate Pogo with your CI/CD pipeline
---

Pogo doesn't provide a full CI/CD pipeline out of the box, but it does provide a way to integrate your favorite CI/CD tool via webhooks.

## Config

CI files must be in `.pogo/ci/*.{yaml,yml}` and can be named anything you want.

Go templates can be used enywhere in the file. All default functions are available as well as:

- `toUpper`: converts a string to uppercase
- `toLower`: converts a string to lowercase
- `trim`: trims whitespace from the beginning and end of a string
- `btoa`: base64 encodes a string
- `atob`: base64 decodes a string

Available data from the Go template:

- `Rev`: name of the revision that triggered the webhook
- `ArchiveUrl`: URL to download the archive of the revision as a zip file - authentication is required if the repository is private

## Example

```yaml
version: 1
on:
  push:
    bookmarks:
      - v*
do:
  - url: https://ci.example.net/job/deploy-release/buildWithParameters
    method: POST
    headers:
      Content-Type: application/json
    body: '{"VERSION": "{{.Rev}}"}, "ZIP": "{{.ArchiveUrl}}"}'
    retry_policy:
      max_attempts: 3
```

Your Pogo server also provides JSON and XML schemas at `/schemas/ci/schema.json` and `/schemas/ci/schema.xsd` respectively.
