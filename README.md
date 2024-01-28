# Research NestJS API

Research NestJS API

## Install NestJS CLI

```sh
npm i -g @nestjs/cli
```

## NestJS CLI Commands

```sh
# generate project named server
nest new server

# generate auth module
nest g module auth

# generate auth service
nest g service auth --no-spec

# generate auth controller
nest g controller auth --no-spec
```

## Run Postgres inside Docker

```sh
cd ./tools/docker/postgres

docker compose up --remove-orphans -d
```

## Prisma ORM

https://www.prisma.io/

```sh
cd ./server

# install dependencies
npm i prisma --save-dev
npm i @prisma/client --save

# verify installation
npx prisma --version
npx prisma --help

# initialise
npx prisma init

# database schema migration
npx prisma migrate dev

# administration studio
npx prisma studio
```

## NestJS Pipes

https://docs.nestjs.com/pipes#class-validator

```sh
npm i class-validator class-transformer --save
```

## Hash and Verify

https://www.npmjs.com/package/argon2

```sh
npm i argon2 --save
```

## NestJS Configuration

https://docs.nestjs.com/techniques/configuration

```sh
npm i @nestjs/config --save
```

## Authentication with JWT Bearer

https://docs.nestjs.com/security/authentication

```sh
npm i @nestjs/jwt --save
```

### Passport (authentication middleware)

https://www.passportjs.org

https://www.passportjs.org/packages/passport-jwt/

### NestJS Recipe Passport (authentication)

https://docs.nestjs.com/recipes/passport

```sh
npm i @nestjs/passport passport --save
npm i @nestjs/jwt passport-jwt --save
npm i @types/passport-jwt --save-dev
```

## NestJS Custom Decorators

https://docs.nestjs.com/custom-decorators

## PactumJS (REST API Testing Tool)

https://pactumjs.github.io/

```sh
# install pactum as a dev dependency
npm i pactum --save-dev

# install a test runner to run pactum tests
# mocha / jest / cucumber
npm i mocha --save-dev
```
