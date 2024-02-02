# Research NestJS API

In this repository I researched NestJS (Express) for API backend development.

## Tech-Facts

Backend (server):

Frontent (client):

## Start NestJS API

Install modules, run linter, test and application:

```sh
cd ./src/server

# clean
rm -rf node_modules dist coverage

# install
npm install

# run linter
npm run lint

# run formatter
npm run format

# run tests (module and integration)
npm run test
npm run test:cov

# run tests (e2e)
npm run test:e2e

# run api
# ...with NODE_ENV="development"
npm run db:dev:restart
npm run start:dev
# ...with NODE_ENV="production"
npm run db:prod:restart
npm run start:prod
```

## Run PostgreSQL inside Docker

```sh
# docker compose up/down
# ...with NODE_ENV="development"
npm run db:dev:up
npm run db:dev:down
# ...with NODE_ENV="production"
npm run db:prod:up
npm run db:prod:down

# docker compose down (all)
npm run docker:down
```

## Prisma Studio (Database Administration)

http://localhost:5555/

```sh
# run prisma studio
# ...with NODE_ENV="development"
npm run prisma:dev:studio
# ...with NODE_ENV="production"
npm run prisma:prod:studio
```

## Adminer (Database Administration)

http://localhost:4200/

Login:

- System: PostgreSQL
- Server: db-dev
- Username: root
- Password: pasSworD
- Database: nestjs-api
