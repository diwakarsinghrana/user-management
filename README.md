## Installation

```bash
$ npm install
```

## Running the app

```bash
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


## API Endpoints
  GET /users: Retrieve all users.

  GET /users/:id
  : Retrieve a user by ID.

  POST /users/create : Create a new user
  
  PUT /users/:id
  : Update a user.

  DELETE /users/:id
  : Delete a user.

  GET /users/search?queryparamerter: Search users by username and age range

  POST /block/:id
  : Block a user

  DELETE /block/:id
  :Unblock a user
