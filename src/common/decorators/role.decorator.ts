import { SetMetadata } from "@nestjs/common";
import { Role } from "../constants/role.enum";

export const ROLE_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles); // here we are creating a custom decorator that takes an array of roles as an argument and sets the metadata ROLE_KEY to the roles