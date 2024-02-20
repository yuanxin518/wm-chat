import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from 'src/schemas/test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: CatSchema, name: Cat.name, collection: 'wmchat' },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
