import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:adminpassword@localhost:27017', {
    dbName: 'nest_main',
    autoCreate: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
