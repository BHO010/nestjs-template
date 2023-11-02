# Nestjs template
A simple nestjs template that includes:
- database connection to both mysql and mongodb
- google server side authentication
- jwt module

Sample authentication code is base on mysql.

## Installation

```bash
$ npm install
```
Create a .env file and copy the [environment variables](https://github.com/BHO010/nestjs-template/edit/main/README.md#env). Fill in your own keys and secret

## Running the app

```bash
# using docker
$ docker compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## OpenAPI/Swagger

Once the app is running, you can view the swagger @ http://localhost:3000/docs

## Env
Set your own google oauth client and secret key
```
# SQL Database
SQL_DATABASE_HOST=localhost
SQL_DATABASE_PORT=3306
SQL_DATABASE_USERNAME=root
SQL_DATABASE_PASSWORD=root
SQL_DATABASE_NAME=nestjs_mysql

# Mongo Database
MONGO_DATABASE_URI=mongodb://localhost:27017
MONGO_DATABASE_NAME=nestjs_mongo
MONGO_DATABASE_USER=
MONGO_DATABASE_PASSWORD=

JWT_ACCESS_SECRET = 9lHXtCUWes
JWT_REFRESH_SECRET= ITcuuqVQRJ
JWT_EXPIRATION_TIME_SECONDS = 900

GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
REDIRECT_URI= 
SALT_ROUNDS=12
```

## References

1. [Setting up MongoDB with Docker](https://dev.to/nyomansunima/create-nestjs-api-using-typescript-mongodb-docker-docker-compose-29k9)
2. [Setting up google oauth client](https://support.google.com/cloud/answer/6158849?hl=en#)
