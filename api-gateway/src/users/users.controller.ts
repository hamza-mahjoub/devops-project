import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Headers,
} from '@nestjs/common';

import { UsersService } from './users.service';
@Controller('auth')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/')
  async createUser(@Body() newUser, @Headers() headers) {
    return await this.usersService.createUser(newUser, { 'X-Request-ID': headers['X-Request-ID'] });
  }

  @Post('/login')
  async login(@Body() data, @Headers() headers) {
    return await this.usersService.login(data, { 'X-Request-ID': headers['X-Request-ID'] });
  }

  @Get('/me')
  async profile(@Req() request
  ) {
    return await this.usersService.me(request.headers);
  }
}
