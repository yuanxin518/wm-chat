import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WsGateway } from './gateway/events.gateway';

@Module({
  imports: [TestModule, MongooseModule.forRoot('mongodb://127.0.0.1/wmchat')],
  providers: [WsGateway],
})
export class AppModule {}
