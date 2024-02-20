import { Global, Module } from "@nestjs/common";
import { GenerateJwtService } from "./generate.jwt.service";
import { JwtService } from "@nestjs/jwt";

@Global()
@Module({
    providers: [GenerateJwtService, JwtService],
    exports: [GenerateJwtService]
})

export class GenerateJwtModule {}