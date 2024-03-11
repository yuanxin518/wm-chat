import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WsGateway } from './gateway/events.gateway';
import { AuthModule } from './modules/auth/auth.module';
import config from './configs/config';
import { AuthService } from './modules/auth/auth.service';
import { UsersModule } from './modules/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TestModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(config.MONGODB_URI),
  ],
  providers: [WsGateway, AuthService, JwtService],
})
export class AppModule {}
