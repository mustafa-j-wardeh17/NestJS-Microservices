
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  await app.listen(process.env.PORT ?? 8001);

  //---------------------------------
  // this micro service is listening 
  //---------------------------------
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://yljkafvf:XEOMZLr5GTJAxWb_-OVAeUn0IG3qN1Lf@hummingbird.rmq.cloudamqp.com/yljkafvf'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  microservice.listen();
}
bootstrap();


