# TCP Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Prerequisites

- Docker
- Node LTS

## Development

There are two ways to run the app for local development:

1. Docker Compose
2. Angular CLI

#### Docker Compose

To run the app in a Docker container with live-reloading, run `docker-compose up` from the top-level directory. This will build the app image (using `local.Dockerfile`) and run it in a container (using `docker-compose.yml` as instructions). The app will be accessible via `localhost:4200`.

When finished developing, terminate the running container (`CTRL+C`) and run `docker-compose down` to safely bring down the container & its dependencies.

#### Angular CLI

To run the app using the Angular CLI approach, simply run `npm start`. The app will be accessible via `localhost:4200`.

## Production

There are three npm commands of importance:

#### `npm run docker:build`

This builds the production Docker image (using `prod.Dockerfile`)

#### `npm run docker:run`

This runs the built Docker image (can be accessed via `localhost:3000`)

#### `npm run docker:debug`

This runs the built Docker image, automatically opens the URL, and adds additional logging

## Architecture

## Auth

### Login

The login page allows the user to provide a username and password. The application then sends down that information in an HTTP request. If the api returns a successful response, it will come in the form of a Java Web Token (JWT). The JWT will then be stored locally (currently in localStorage)

### Java Web Token

A Java Web Token is an json object that has been encoded as a string. The JWT for our application takes the following form:
{
"iat": 1560354819921,
"exp": 1591984329089,
"email": "jon.doe@gmail.com",
"role": "admin"
}

In addition to the shown fields there is also another filed that stores a string that is used by the backend to authenticate that the user. This information is sent in the header of each api request using the auth0/angular-jwt library. The auth0/angular-jwt library is also used to decode the JWT and allow the frontend to access the properties included such as "role".

### authGuard

An authGuard is used to prevent users from navigating to screens that they are not allowed to see. This gaurd will check to see if the user is logged in, and if not it will always redirect them to the login page. Additionally, the authGuard can be given a roles property which will in turn check the role from the JWT object and only allow users to proceed if they are one of the accepted roles. Otherwise it will redirect them to the home page.

## Forms

## Routing

## Testing

'npm run test' is the console command to run the tests

85% is the agreed upon tcp minimal test coverage ammount

more information to be put here as the test framework is ironed out
