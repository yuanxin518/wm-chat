import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  constructor(userId: string, targetUserId: string) {
    this.sendUserId = userId;
    this.targetUserId = targetUserId;
  }
  
  @Prop()
  sendUserId: string;

  @Prop()
  targetUserId: string;

  @Prop()
  messageContent: string;

  @Prop()
  time: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
