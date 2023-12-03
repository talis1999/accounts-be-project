# Node.js/ Express/ Typescript/ Postgres server project

Steps to run this project:

1. Run `npm i` command
2. Setup `.env` for the db ( `db.ts` ) as well as for the express port and `jwt` secret ( those 2 are optional )
3. Run `npm start` command

Basic account creation flow
1. Register new user via `(POST) /users/register`
2. Login with the new user `(POST) /users/login`
3. Create new account under the selected user `(POST) /accounts`
4. Perform operations under the new account `/accounts/<account_id>`
5. Logout `(POST) /users/logout`
