import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: Server) {
    this.logger.log('Socket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('setup')
  handleSetup(client: Socket, userData: any): void {
    client.join(userData._id);
    client.emit('connected');
  }

  @SubscribeMessage('join chat')
  handleJoinChat(client: Socket, room: string): void {
    client.join(room);
    this.logger.log(`User joined room: ${room}`);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, room: string): void {
    client.to(room).emit('typing');
  }

  @SubscribeMessage('stop typing')
  handleStopTyping(client: Socket, room: string): void {
    client.to(room).emit('stop typing');
  }

  @SubscribeMessage('new message')
  handleNewMessage(client: Socket, newMessageReceived: any): void {
    const chat = newMessageReceived.chat;
    if (!chat.users) {
      this.logger.error('chat.users not defined');
      return;
    }
    chat.users.forEach((user: any) => {
      if (user._id === newMessageReceived.sender._id) return;
      client.to(user._id).emit('message received', newMessageReceived);
    });
  }
}
