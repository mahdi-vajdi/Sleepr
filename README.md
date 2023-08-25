## Description

• A NestJs project based on miroservices design.
•	Containerized MongoDB database with Mongoose as ORM.
•	Multiple branches which use different transport protocols like: TCP, gRPC, RabbitMQ and Kafka.
•	All the services, database and message brokers are containerized with Docker.
• Checkout different branches for different implemetations.


## Running the app

```bash
#installation
$ pnpm install

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
