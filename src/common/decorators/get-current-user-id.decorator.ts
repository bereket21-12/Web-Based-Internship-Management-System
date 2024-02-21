import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Here we are creating a custom decorator to get the current user from the request object.
export const GetCurrentUserId = createParamDecorator( // createParamDecorator is a function that takes a function as an argument and returns a new function.
    (data: string | undefined, context: ExecutionContext) => { // The function that createParamDecorator takes as an argument takes two parameters: data and context. The data parameter is of type string or undefined, it is used to specify the property of the user object to return. The context parameter is of type ExecutionContext, it is used to get the request object.
        const request = context.switchToHttp().getRequest(); // We get the request object from the context parameter using the switchToHttp method.
        if(!data) return request.user; // If the data parameter is not specified, we return the entire user object from the request object.
        return request.user['sub'] // If the data parameter is specified, we return the property of the user object specified by the data parameter.
    }
)