import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WsGateway } from './gateway/events.gateway';
import { AuthModule } from './modules/auth/auth.module';
import config from './configs/config';

@Module({
  imports: [TestModule, AuthModule, MongooseModule.forRoot(config.MONGODB_URI)],
  providers: [WsGateway],
})
export class AppModule {}
