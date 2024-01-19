# goForage API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U labber` command to login to the PostgreSQL server with the username `labber` and the password `labber`. 

Create a database with the command `CREATE DATABASE goforage;`.


```
PGHOST=localhost
PGUSER=labber
PGDATABASE=goforage
PGPASSWORD=labber
PGPORT=5432
```

## Seeding

Run the development server with `npm start` in the Host environment. 
Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

## Run The Server

Running the server normally
```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
npm run error
```