# Research NestJS API

Research NestJS API

## Install NestJS CLI

```sh
npm i -g @nestjs/cli
```

## NestJS CLI Commands

```sh
# generate project
nest new server

# generate modules
nest g module auth
```

## Run Postgres inside Docker

```sh
cd ./tools/docker/postgres

docker compose up --remove-orphans -d
```
