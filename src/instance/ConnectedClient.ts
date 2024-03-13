import { WebSocket } from 'ws';

export class ConnectedClient {
  constructor() {}

  private connectedClients: Map<number, WebSocket> = new Map();

  // 接入客户端
  addClient(userId: number, client: WebSocket) {
    this.connectedClients.set(userId, client);
  }

  // 移除客户端
  removeClient(userId: number) {
    this.connectedClients.delete(userId);
  }

  // 获取连接总数
  getAllCount() {
    return this.connectedClients.size;
  }

  // 根据userId获取已存在的连接
  getClientById(userId: number): WebSocket | undefined {
    return this.connectedClients.get(userId);
  }

  // 向指定用户发送聊天
  sendMessageToUser(userId: number, targetUserId: number, message: string) {
    const targetUser = this.connectedClients.get(targetUserId);

    if (targetUserId && !targetUser) console.warn(`${targetUserId}未加入`);

    if (!targetUser) return;

    targetUser.send(
      JSON.stringify({
        user: userId,
        msg: message,
      }),
    );
  }

  // 向聊天室所有人发送信息
  sendMessageToGroup(groupId: number, message: string) {
    this.connectedClients.forEach((client) => {
      client.send(
        JSON.stringify({
          groupId,
          message,
        }),
      );
    });
  }
}
