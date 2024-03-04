import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway ,MessageBody ,SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class Mygateway implements OnModuleInit {

    @WebSocketServer()
    server : Server

    onModuleInit() {
        this.server.on('connection',(socket)=>{

            console.log(socket.id)
            console.log('connected')

        })
    }


    @SubscribeMessage('newmessage')
    onNewMessage(@MessageBody() body:any){

        console.log(body)
        this.server.emit('onMessage',()=>{

            body
        })

    }


}