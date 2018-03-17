# bhongy-learns-howtographql
Learn GraphQL from https://www.howtographql.com

## Server
You'll need a Docker cluster to run local Prima database.
- [install Docker compose](https://docs.docker.com/compose/install/)
- Start Docker
- `cd server`
- `yarn prisma deploy`
- `yarn dev`
- set Playground: *database* Authorization header (get token from `yarn prisma token`)
```json
{
  "Authorization": "Bearer <db_access_token>"
}
```

## Client

## Ports
- `:8001` Apollo Client
- `:8002` Relay Client
- `:3000` Playground (GraphiQL) Client
- `:4000` GraphQL Server
- `:4466/server/dev` Prisma Database
