import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/role.decorator";
import { Role } from "../constants/role.enum";
import { AccessControlService } from "../access_control/access_control.service";

export class TokenDto {
    id: string;
    email: string;
    role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector, // The Reflector class is used to retrieve metadata from the handler or class. In this case, we are using it to retrieve the required role from the handler or class.
        private accessControlService: AccessControlService // The AccessControlService class is a service that we need to inject into the RoleGuard class. This service is used to check if the current user has the required role to access a particular route.
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(), // The getHandler() method returns the handler (method) that will be executed for the current request.
            context.getClass(), // The getClass() method returns the class that the handler belongs to. Handlers are methods that are decorated with route decorators like @Get(), @Post(), etc.
        ]);

        const request = context.switchToHttp().getRequest(); // The switchToHttp() method returns an object that provides access to the request and response objects. The getRequest() method returns the request object.
        if (!request['user']) {
            console.log('Request: ', request);
            throw new Error('Token is missing from request');
        }

        const token = request['user'] as TokenDto;

        for (const role of requiredRole) {
            const result = this.accessControlService.isAuthorized({
                requiredRole: role,
                currentRole: token.role as Role,
            });

            if (result) {
                return true;
            }
        }
        return false;
    }
}