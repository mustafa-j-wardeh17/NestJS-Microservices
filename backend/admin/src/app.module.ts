import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,//dev porpose
      synchronize: true,//dev porpose
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
