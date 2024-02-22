import { AuthGuard } from "@nestjs/passport";

// The RtGuard class extends the AuthGuard class from the @nestjs/passport package. This class is used to protect routes that require a refresh token to access by checking if the refresh token is valid.
export class RtGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super()
    }
    
}