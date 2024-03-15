import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/Message';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
  ) {}

  async saveMsg(message: Message) {
    return await this.MessageModel.create(message);
  }
}
