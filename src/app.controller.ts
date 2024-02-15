import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getUsers() {
    // return this.userService.users();
    return 'Jello World'
  }

}
