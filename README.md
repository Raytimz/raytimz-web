# Raytimz web

The public website for [raytimz.com](https://raytimz.com). It is the public
entry point for the Raytimz software ecosystem and is intentionally separate
from private server administration and deployment configuration.

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Container image

Pushes to `main` publish immutable images to:

```text
ghcr.io/raytimz/raytimz-web:<commit-sha>
```

Production runs the exact commit-tagged image. The moving `main` tag is
provided for convenient manual testing but is not used for automatic
production deployments.

```bash
docker build -t raytimz-web .
docker run --rm -p 127.0.0.1:3100:3000 raytimz-web
```
