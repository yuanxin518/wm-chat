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

  async getMsgDetail(message: Message) {
    return await this.MessageModel.find({
      $or: [
        { targetUserId: message.targetUserId, sendUserId: message.sendUserId },
        { targetUserId: message.sendUserId, sendUserId: message.targetUserId },
      ],
    }).exec();
  }

  async getAllMsg(userId: string) {
    return await this.MessageModel.find({
      $or: [{ targetUserId: userId }, { sendUserId: userId }],
    }).exec();
  }
}
