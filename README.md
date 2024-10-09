# Wirelab Portal

## Why built this project?

As a lab network admin, I've noticed that most people struggle with Wireguard and SSH configurations. These technical hurdles often lead to significant time delays, hindering their ability to focus on their core research. To streamline this process, I built this web app to help them go through the setup process step-by-step, enabling researchers to access their work environments more efficiently and devote more time to their valuable studies.

## Project setup

This project is built with [Bun](https://bun.sh/). Please install it first.

After that, run the following command to install dependencies:

```sh
bun install
```

## Project structure

This project is a monorepo managed with [Turborepo](https://turborepo.org/).

- `apps/webapp`: A React application for the user portal. This is hosted on the firebase hosting.
- `apps/admin`: A Next.js application for the admin portal. This is not hosted on the firebase hosting. To run it, you need to clone the repo and run locally.
- `packages/ui`: A React component library. It contains components from [shadcn/ui](https://github.com/shadcn/ui) and a shared css style.
- `packages/eslint-config`: A shared eslint config.
- `packages/typescript-config`: A shared typescript config.
