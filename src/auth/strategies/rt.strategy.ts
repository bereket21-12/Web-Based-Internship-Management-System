import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.RT_SECRET,
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: any) {
        const refresh_token = req.get('authorization').replace('Bearer ', '').trim();
        console.log('payload', payload, 'refreshToken', refresh_token);
        return {
            ...payload,
            refresh_token
        }
    }
}