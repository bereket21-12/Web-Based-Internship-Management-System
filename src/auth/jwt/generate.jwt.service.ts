import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GenerateJwtService {
    constructor(private jwtService: JwtService) { }
    async getToken(userId: string, email: string, role: string) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role
            },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h', // 1 hour
                }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role
            },
                {
                    secret: process.env.RT_SECRET,
                    expiresIn: 60 * 60 * 24 * 7,
                })
        ]);

        return {
            access_token,
            refresh_token
        }
    }
}