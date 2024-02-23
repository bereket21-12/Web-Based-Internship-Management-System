import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  messageService: any;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {

     return data;
  }

  private connections: Set<WebSocket> = new Set();

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.connections.add(client);
    const clientId = (client as any).id; // Use 'any' casting for Socket.io extension
    console.log('Client connected:', clientId);

  }

  handleDisconnect(client: WebSocket) {
    this.connections.delete(client);

    console.log('Client disconnected');
  }

  sendMessage(message: any) {
    const messageString = JSON.stringify(message);
    this.connections.forEach(client => {
      client.send(messageString);
    });
  }


  async getUserById(id: string): Promise<User | undefined> {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }
  async handlePrivateMessage(@MessageBody() message: { senderId: string, receiverId: string, content: string }) {
    const sender = this.getUserById(message.senderId);
    const receiver = this.getUserById(message.receiverId);
  
    if (sender && receiver) {
      const receiverClient = this.connections.get(receiver.socketId);
      if (receiverClient) {
        receiverClient.emit('private_message', message); // Deliver immediately if online
      } else {
        // Store message for offline recipient
        await this.messageService.storeMessage(message);
      }
    } else {
      console.log(`Invalid sender or recipient.`);
    }
  }

  
}
