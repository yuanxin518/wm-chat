import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { IncomingMessage } from 'http';
import config from 'src/configs/config';

import { ConnectedClient } from 'src/instance/ConnectedClient';
import { AuthService } from 'src/modules/auth/auth.service';

import { WebSocket } from 'ws';

@Injectable()
@WebSocketGateway(81)
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  connectedClient = new ConnectedClient();

  afterInit(server: any) {
    server;
  }

  /**
   * 处理连接，其中检查是否头部有websocket和token的标识内容，并在校验token成功后通过
   * @param client
   * @param request
   */
  async handleConnection(client: Socket, request: IncomingMessage) {
    const { headers } = request;
    const authToken =
      headers['sec-websocket-protocol'] || (headers[config.TOKEN] as string);

    try {
      if (!(await this.authService.varifyLoginByToken(authToken))) {
        client.close();
      }
    } catch (error) {
      client.close();
    }
  }

  handleDisconnect(client: any) {
    client;
  }

  @SubscribeMessage('join')
  join(
    @MessageBody()
    data: { test: string; token: string },
    @ConnectedSocket() client: WebSocket,
  ): any {
    const { token } = data;
    const { userId } = this.jwtService.decode(token) || {};

    if (!userId) return;
    this.connectedClient.addClient(userId, client);

    return {
      event: 'hello',
      data: {
        count: this.connectedClient.getAllCount(),
      },
      msg: '',
    };
  }

  @SubscribeMessage('send-msg')
  sendMsg(
    @MessageBody()
    data: {
      targetUserId: number;
      msg: string;
      token: string;
    },
  ): any {
    const { targetUserId, msg, token } = data;

    const { userId } = this.jwtService.decode(token);
    if (!userId) return;

    this.connectedClient.sendMessageToUser(userId, targetUserId, msg);

    return {
      msg: '发送成功',
    };
  }
}
