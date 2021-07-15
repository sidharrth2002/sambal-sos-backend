[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

# Sambal Sos Backend 

## Prerequisites
have postgresql installed [here](https://www.postgresql.org/download/)

1) start a session by doing ```$ psql postgres ``` in your terminal

2) when you see ``` postgres=# ```, type in
```sql
 CREATE DATABASE benderaputih;
 ```

 3) login to the db ```\c benderaputih```

4) Create postgis extention for your db
```sql
CREATE EXTENSION postgis;
```

## How to install

1. clone the repo
2. run ```npm install```
3. create ```.env``` file as given in [env example](.env.example)
4. enter your database configs in ```.env``` at least for development in local.
5. run ```npx sequelize db:create``` It will create database for you.
6. run ```npx sequelize db:migrate``` It will create tables.
7. run ```npm run dev```

### Tech Stack

- [x] Server with Express.js
- [x] Database schema and models using Sequelize ORM.
- [x] User authentication with JWT.
- [x] StandardJs for coding standards and styling.
- [x] Request validation using Express-validator.
- [x] Morgan and Winston for server side logging.
- [x] Swagger for API documentation.

### How to make pull requests
we would prefer if the pull requests are formatted so it would streamline our workflow

```
NAMING CONVENTION: FEAT/FIX/REFACTOR nameOfContribution

What type of change did you make?
feat (add something new) or fix (fix an issue) or refactor (no changes to features, e.g. removing comments, logs)

Describe the changes:
1.
2.
3. 

Add screenshots:


[] Does your change break anything?

Mention someone for review
@someone
```
