# bhongy-learns-howtographql
Learn GraphQL from https://www.howtographql.com
The project uses Yarn Workspaces. You can think of server, client as two separate repositories - i.e. two separate sets of dependencies and npm scripts.

## Server
You'll need a Docker cluster to run local Prima database.
- [install Docker compose](https://docs.docker.com/compose/install/)
- Start Docker
- `cd server`
- `yarn prisma deploy`
- `yarn dev`

## Client
