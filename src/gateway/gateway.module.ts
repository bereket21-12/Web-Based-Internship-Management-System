import { Module } from "@nestjs/common";
import { SocketGateway } from "./gateway";
@Module({

    providers:[SocketGateway]
})
export class GatewayModule{}
