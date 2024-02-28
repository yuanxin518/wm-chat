import { WebSocket } from 'ws';

export class ConnectedClient {
  constructor() {}

  private connectedClients: Map<string, WebSocket> = new Map();

  // 接入客户端
  addClient(token: string, client: WebSocket) {
    this.connectedClients.set(token, client);
  }

  // 移除客户端
  removeClient(token: string) {
    this.connectedClients.delete(token);
  }

  // 获取连接总数
  getAllCount() {
    return this.connectedClients.size;
  }
}
