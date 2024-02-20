import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TestService {
  constructor(@InjectConnection() private connection: Connection) {}

  async test() {
    console.log(await this.connection.models.Cat.find().exec());

    return {
      test: 'test',
    };
  }
}
