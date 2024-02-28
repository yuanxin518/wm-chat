import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  userId: number;

  @Prop()
  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @Prop()
  @ApiProperty({
    description: '密码',
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
