import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/role.decorator";
import { Role } from "../constants/role.enum";
import { AccessControlService } from "../access_control/access_control.service";

export class TokenDto {
    id: string;
    role: string;
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private accessControlService: AccessControlService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const token = request['token'] as TokenDto;

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