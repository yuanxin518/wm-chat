import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { SubscribeMessage } from '@nestjs/websockets';
import { Connection } from 'mongoose';

@Injectable()
export class TestService {
  constructor(@InjectConnection() private connection: Connection) {}

  @SubscribeMessage('events')
  async test() {
    console.log(await this.connection.models.Cat.find().exec());

    return {
      test: 'test',
    };
  }
}
