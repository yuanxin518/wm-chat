import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageModel } from './model';
import { JwtService } from '@nestjs/jwt';
import { Message } from 'src/schemas/Message';
import { UserService } from '../user/user.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly userSerice: UserService,
  ) {}

  @Post('detail')
  @ApiOperation({ summary: '获取用户相关的消息' })
  async detail(@Body() messageDto: MessageModel, @Req() req: Request) {
    const token = req.headers['wm-chat-token'];
    const { username } = await this.jwtService.decode(token);
    const user = await this.userSerice.findOne(username);

    const msg = await this.messageService.getMsgDetail(
      new Message(user.userId, messageDto.targetUserId),
    );

    const msgList = msg.map((item) => ({
      messageId: item._id,
      message: item.messageContent,
      time: item.time,
      self: item.sendUserId === user.userId,
    }));

    return {
      success: true,
      data: msgList,
    };
  }
}
