# nestjs template

## Installation

```bash
$ npm install
```

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

## Resource

nest g resource module_name

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
