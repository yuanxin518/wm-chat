import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import WebSocket from 'ws';

@WebSocketGateway(81)
export class WsGateway {
  @SubscribeMessage('hello')
  hello(@MessageBody() data: { test: string }): any {
    console.log('!@3');
    return {
      event: 'hello',
      data: data.test,
      msg: 'rustfisher.com',
    };
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', client);
    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    return { event: 'hello2', data: data };
  }
}
