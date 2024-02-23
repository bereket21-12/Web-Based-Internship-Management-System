import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "../types";

// Here we are creating a custom decorator to get the current user from the request object.
export const GetCurrentUserId = createParamDecorator( // createParamDecorator is a function that takes a function as an argument and returns a new function.
    (_: undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload;
        return user.sub;
    }
)