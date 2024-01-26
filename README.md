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

# generate module named auth
nest g module auth
```

## Run Postgres inside Docker

```sh
cd ./tools/docker/postgres

docker compose up --remove-orphans -d
```

## Prisma ORM

https://www.prisma.io/

```sh
npm i prisma --save-dev

npm i @prisma/client --save
```
