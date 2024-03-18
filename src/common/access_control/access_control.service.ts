import { Injectable } from '@nestjs/common';
import { Role } from '../constants/role.enum';

interface IsAuthorized { // This is an interface that defines the structure of the object that will be passed to the isAuthorized method, we need IsAuthorized interface so that we can use it as a type in the isAuthorized method
    currentRole: Role;
    requiredRole: Role;
}

@Injectable()
export class AccessControlService {
    private hierarchies: Array<Map<string, number>> = []; //here we are creating an array of maps, each map will contain the role and its priority
    private priority: number = 1; // this is the priority of the role, the least privileged role will have the lowest priority

    constructor() {
        this.buildRoles([ // here we are calling the buildRoles method and passing an array of roles so that we can create a role hierarchy
            Role.MENTOR,
            Role.ADVISOR,
            Role.DEPARTMENT_HEAD,
            Role.COLLEGE_DEAN,
            Role.STUDENT,
            Role.COMPANY_HR,
            Role.UNIVERSITY_ADMIN,
            Role.SYSTEM_ADMIN,
        ]);
    }
    /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most priviliged one
   * @param roles Array that contains list of roles
   */

    private buildRoles(roles: Array<Role>): void {
        const hierarchy: Map<string, number> = new Map(); // here we are creating a map to store the role and its priority
        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });
        this.hierarchies.push(hierarchy); // here we are pushing the map to the hierarchies array
    }

    public isAuthorized({ currentRole, requiredRole }: IsAuthorized): boolean { // here we are defining the isAuthorized method, it takes an object of type IsAuthorized as an argument and returns a boolean, it is used to check if the current role has the required role
        for (const hierarchy of this.hierarchies) {
            const priority = hierarchy.get(currentRole);
            const requiredPriority = hierarchy.get(requiredRole);
            if (priority && requiredPriority && priority >= requiredPriority) {
                return true;
            }
        }
        return false;
    }
}
