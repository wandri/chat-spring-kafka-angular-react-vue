# Chat : Full-stack coding exercise

## Presentation

This application is a Whatsapp-like application. It provides realtime conversations with other people.

  ![user page](./doc/user_screen.jpg)
  ![chat page](./doc/message_screen.jpg)
## Structure

### API
The api is done with Java 8 and Spring Boot 2.
It provides a websocket connection for realtime conversation.

### Multiple Fronts
- [Angular](https://angular.io) (Typescript & scss)

- [React](https://reactjs.org/) (Typescript & scss)

- [Vue](https://fr.vuejs.org/) (Typescript & scss)

## Initiate the stack locally

### Database

For the project, we will launch a docker image of mongoDB and Kafka.

We can achieve to code a chat without any store or message broker. But if we do so we lose, to my mind, all the interest of the project.

1. Install [Docker](https://docs.docker.com/install/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. To run Kafka and Mongo images, execute in the deploy folder: 
    ```
    docker compose -f docker-compose.yml up -d
    ```
### API

1. Install Java 8 and [maven](https://maven.apache.org/install.html)
2. Generate the maven packages and the Avro file with :
    ```
    mvn compile
    ```

### Front

1. Install [NodeJs](https://nodejs.org/en/)
2. For Angular, install the dependencies :
    ```
    npm install -g @angular/cli
    ```
3. Install the module of the project in the front folders:
    ```
    npm i
    ```

## How to start locally

### API

Launch the API with : 

```
mvn spring-boot:run
```

### Front

#### Angular

Run the application in localhost:4200 in the front folder : 
```
ng serve -o
```

#### React

Run the application in localhost:3000 in the front folder : 
```
npm start
```

#### Vue

Run the application in localhost:5173 in the front folder : 
```
npm run serve
```

## What can be better :

- The api is not completely independent. It will be better if we don't use `User` and `Message` from the domain. 
We need to create new classes for the API and map `Domain` and `User` to them.
- For the purpose of the project, there is **NO test**. And this is a bad practice. We need to improve the test coverage.
- The format of messages is known. It could be interesting to check if SQL can be better.
- I use Angular to iterate quickly. But For better performance, it can be done without any framework, in pure JS.
