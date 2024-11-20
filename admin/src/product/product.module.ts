import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

  //-------------------------------------------------------------------------------
  // this micro service is sending events here set url and queue the same with main
  //-------------------------------------------------------------------------------
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://yljkafvf:XEOMZLr5GTJAxWb_-OVAeUn0IG3qN1Lf@hummingbird.rmq.cloudamqp.com/yljkafvf'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
