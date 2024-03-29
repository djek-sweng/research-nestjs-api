# Research NestJS API

In this repository I researched NestJS (Express) for API backend development.

## Tech-Facts

Backend (server):

- NestJS with Express (Web Framework)
- Restful API
- PostreSQL (Database)
- Prisma (ORM)
- Input Validation
- Authorization Bearer (JWT)
- Passport (Authentication Middleware)
- argon2 (Password Hashing)
- Helmet (Secure Header)
- Custom Decorators
- CORS Headers
- Swagger (OpenAPI Interface)
- dotenv
- e2e and Unit Tests (Jest, Pactum and Mocha)

Frontent (client):

- [Minimal Client](./src/client/minimal/index.html)
- [Postman Client](./src/client/postman/research-nestjs-api.postman_collection.json)

Database (docker):

- [PostgreSQL](src/server/docker/postgres/docker-compose.yml)

## Start NestJS API

Install modules, run linter, tests and start application:

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

## Swagger (OpenAPI interface)

http://localhost:5000/swagger

## Toolchain Requirements and Versions

```sh
nest --version
  10.3.0

node --version
  v20.11.0

npm --version
  10.4.0

nvm --version
  0.39.7

docker --version
  Docker version 25.0.1, build 29cf629

code --version
  1.86.0

  Useful extensions:
    archsense.architecture-view-nestjs
    prisma.prisma
    ms-azuretools.vscode-docker
    esbenp.prettier-vscode
    editorconfig.editorconfig
    pkief.material-icon-theme
```
