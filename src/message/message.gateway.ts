import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';


@WebSocketGateway()
export class MessageGateway {

  @WebSocketServer() server: Server;
  private clients: { [id: string]: Socket } = {}; // Map of client identifiers to Socket objects

  handleConnection(client: Socket, ...args: any[]) {
    const receiverId = client.handshake.query.receiverId; // Extract receiverId from query parameters
     console.log("recivedID : ",receiverId)
    if (Array.isArray(receiverId)) {
      // If receiverId is an array, handle it (e.g., take the first element)
      this.clients[receiverId[0]] = client;
    } else {
      // If receiverId is a single string, proceed as normal
      this.clients[receiverId] = client;
    }
  }

  handleDisconnect(client: Socket) {
    // Remove client from the map when disconnected
    const receiverId = Object.keys(this.clients).find(key => this.clients[key] === client);
    if (receiverId) {
      delete this.clients[receiverId];
    }
  }
 
  constructor(private messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, data: CreateMessageDto) {
    
   const { senderId, receiverId } = data;
   const savedMessage =  await this.messageService.createMessage(data );
   const targetClient = this.server.sockets.sockets.get(receiverId);
   console.log("target clinet is: ",targetClient)
    if (targetClient) {
      // Send the message to the specific client
      targetClient.emit('receiveMessage', savedMessage);
    } else {
      // Handle the case when the specific client is not found
    }
  }
}
