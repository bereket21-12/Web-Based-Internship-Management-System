import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private jwtService: JwtService) {} // JwtService is a service that we need to inject into the AuthGuard class, this class is used to verify the JWT token.

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException('Unauthorized');
        }

        try {
            const payload = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
            request['token'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}