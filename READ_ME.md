# Doodle : Full-stack coding exercise


## Presentation

This application is a Whatsapp-like application. It provides realtime conversations with other people.

## Structure

### API
The api is done with Java 8 and Spring Boot 2.
It provides a websocket connection for realtime conversation.

### Front
The front is done with [Angular](https://angular.io). It's written in typeScript. 
But the code doesnt use here the functionality of typescript for the format of the exercise.

> Please, use JavaScript (Vanilla JS, React, ...). 

## How to start locally

### Database

For the project, we will launch a docker image of mongoDB.

1. Install [Docker](https://docs.docker.com/install/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. Run in the deploy folder : `docker-compose -f docker-compose.yml up -d`

### API


### Front

1. Install [NodeJs](https://nodejs.org/en/)
2. Install the dependencies : `npm install -g @angular/cli`
3. Install the module of the project in the front folder: `npm i`
4. Run the application in localhost:4200 in the front folder : `ng serve -o`
