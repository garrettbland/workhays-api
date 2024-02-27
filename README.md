# Nitro Minimal Starter

Look at the [Nitro documentation](https://nitro.unjs.io/) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nitro.unjs.io/deploy) for more information.

---

Migration plan.

Phase 1

-   Migrate DB to ~planetscale~ firebase

Phase 2

-   Setup api routes for jobs
-   Update current work hays routes to use new API endpoints for jobs
-   Setup api routes for employers
-   Update current work hays routes to use new API endpoints for employers
-   Move contact page api
-   Move cron jobs over and pause current

Phase 3

-   Build out logic for admin API stuff
-   Update current admin API routes to use new API endpoints

Phase 4

-   Figure out how to move over to third party auth
    -   Add column to users saying "migrated"? or something?
    -   Would need to check current db password, then take them through migration process.
    -   Or - send current users an email saying to reset (not ideal)
    -   Firebase and Auth0 look like they support bulk import from custom hashing. It would force them to reset their password on first time login. (ideal)

---
