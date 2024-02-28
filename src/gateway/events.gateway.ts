import { Injectable } from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) {}
  connectedClient = new ConnectedClient();

  afterInit(server: any) {
    server;
  }

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
  hello(
    @MessageBody() data: { test: string; token: string },
    @ConnectedSocket() client: WebSocket,
  ): any {
    const { token } = data;

    this.connectedClient.addClient(token, client);

    return {
      event: 'hello',
      data: {
        count: this.connectedClient.getAllCount(),
      },
      msg: 'rustfisher.com',
    };
  }
}
