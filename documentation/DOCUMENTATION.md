# Déjà View Documentation

## Front-end Architecture

- React / JavaScript

## Back-end Architecture

- Express
  - Passport (authentication)
  - Knex (database)

### Data

```js
// Dictionary of events keyed by YYYY-MM-DD string.
{
  "2018-06-04" : [
    {
      "title" : "The Headline",
      "text" : "So and so did an interesting thing...",
      "link" : "https://www.thing.com",
      "label" : "New York Times"
    }
  ]
}
```

### Backend Endpoints

Use REST API.

`/GET/:YYYYMMDD` - Return an object of events in the week leading up to and including the given day. The object will have 7 keys.

## Database

- AWS RDS
  - Postgres

We are using AWS because Heroku has a 10,000 row limit on RDB. AWS has a 20 GB limit.

## How it works

Heroku will host the application. The express app will query the database remotely. The credentials and URL will be stored in .env.

We are choosing to start with Heroku because we are familiar with the deployment pipeline. However, we feel that this application will exceed the capacity for a _hobby_ level project before the end of 4 weeks. We will try to get everything on AWS for Demo Day. But, for MVP, everything on AWS is a bit of a reach.

AWS will host the database. The data will be seeded manually (for MVP) using Python scripts.
