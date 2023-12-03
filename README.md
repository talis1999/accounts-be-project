# Node.js/ Express/ Typescript/ Postgres server project

> Steps to run this project:

1. Run `npm i` command
2. Setup `.env` for the db ( `db.ts` ) as well as for the express port and `jwt` secret ( those 2 are optional )
3. Run `npm start` command

___

> Basic account creation flow:
1. Register new user via `(POST) /users/register`
2. Login with the new user `(POST) /users/login`
3. Create new account under the selected user `(POST) /accounts`
4. Perform operations under the new account `/accounts/<account_id>`
5. Logout `(POST) /users/logout`

___

> Currently available routes:
### `users/`
- `(POST) /users/register`
  - `req.body`
    - name - string `required *`
    - password - string `required *`
    - document - string `required *`
    - birthDate - date `required *`
- `(POST) /users/login`
  - `req.body`
    - name - string `required *`
    - password - string `required *`
- `(POST) /users/logout`  `* auth` 

### `accounts/`  `* auth` 
- `(GET) /accounts`
- `(GET) /accounts/<account_id>`
  - `req.query`
      - balanceOnly - boolean
- `(POST) /accounts`
  - `req.body`
    - balance - number
    - dailyWithdrawlLimit - number
    - accountType - number
- `(PATCH) /accounts/<account_id>` ( Block account operation )
  - `req.body`
    - activeFlag - boolean `required *`

### `accounts/<account_id>/transactions/`  `* auth`
- `(GET) /transactions/`
  - `req.query`
      - from - date
      - to - date
- `(POST) /transactions/`
  - `req.body`
    - monetaryRequest - number `required *`


