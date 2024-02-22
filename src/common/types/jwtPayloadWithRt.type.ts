import { JwtPayload } from '.'

export type jwtPayloadWithRt = JwtPayload & { refresh_token: string }