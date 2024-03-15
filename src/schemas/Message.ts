import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  sendUserId: string;

  @Prop()
  targetUserId: string;

  @Prop()
  messageContent: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
