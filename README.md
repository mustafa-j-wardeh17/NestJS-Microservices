# Microservices with RabbitMQ in NestJS

![Microservices Overview](https://docs.nestjs.com/assets/Microservices_1.png)

## Overview
In modern application development, microservices architecture is a popular approach that allows applications to scale and evolve efficiently. NestJS natively supports microservices, enabling seamless development with the same core features as monolithic architectures, such as dependency injection, decorators, pipes, guards, and interceptors. These features ensure consistent design patterns across HTTP, WebSockets, and microservices.

This repository demonstrates a microservices-based application using **RabbitMQ** as the messaging transport layer. 

---

## What is RabbitMQ?

[RabbitMQ](https://www.rabbitmq.com/) is an open-source, lightweight, and highly-deployed message broker that supports multiple messaging protocols. It is designed for distributed systems and enables communication between microservices with features such as:
- **High Scalability**
- **Fault Tolerance**
- **High Availability**

RabbitMQ acts as the central hub for sending and receiving messages between services, enabling loosely-coupled communication.

---

## Installation and Setup

### Install NestJS Microservices Package

To start building microservices, first, install the required package for NestJS:
```bash
npm install --save @nestjs/microservices
```

### Install RabbitMQ Dependencies
To integrate RabbitMQ, you need the following libraries:

```bash
npm install --save amqplib amqp-connection-manager
```



## Example: Microservices with RabbitMQ

### Listening Microservice
This microservice listens for events from RabbitMQ.

```typescript
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: ['amqps://your-rabbitmq-url'],
    queue: 'main_queue',
    queueOptions: {
      durable: false,
    },
  },
});

app.listen();
```
The microservice listens on the **main_queue** and processes incoming messages.


### Event Sending Microservice
This microservice sends events to RabbitMQ.

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://your-rabbitmq-url'],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
```
In this module:
- PRODUCT_SERVICE is registered as a RabbitMQ client.
- The same main_queue is used for communication.

### Testing the Microservices
#### Event Emission
In the sending microservice, an event is emitted to RabbitMQ. This is an example of sending a hello message:

```typescript
@Controller('products')
export class ProductController {
  constructor(
    private readonly productServices: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async allProducts(): Promise<Product[]> {
    this.client.emit('hello', 'Hello From RabbitMQ'); // Sends message to RabbitMQ
    return this.productServices.all();
  }
}
```

#### Event Listening
The listening microservice receives and processes the **hello** event:

```typescript
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('hello') // Listens for 'hello' events
  async hello(data: string) {
    console.log(data); // Logs "Hello From RabbitMQ"
  }
}
```

## Summary
This project showcases:
- How to set up microservices with RabbitMQ in a NestJS application.
- Configuring RabbitMQ to handle messaging between services.
- Sending and receiving events between loosely-coupled microservices using RabbitMQ.

## Benefits of This Approach:
- Scalability: Easily scale individual services independently.
- Resilience: Fault-tolerant design with RabbitMQ handling message reliability.
- Flexibility: Clear separation of concerns for services.

By leveraging NestJS and RabbitMQ, this microservices architecture ensures efficient communication, modularity, and maintainability in distributed systems. 🎉






