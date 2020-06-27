# Trip Planer API

## Set up

To run the project you need this following software installed

- Docker
- Node js 12.18.0

1. inside `database` run `docker-compose up`
2. change the ip in the .env inside `prisma`
3. run `npx prisma migrate up --experimental`
4. run `npx prisma generate`
5. run `npm run start:dev`

## Update database migration

1. run `npx prisma migrate save --name init --experimental`

## Test

1. run `npm test`
