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
  } from '@nestjs/common';
  import { CreateUserDto } from './DTO/createUserDto';
  import { EditPasswordDto } from './DTO/editPasswordDto';
  import { UpdateUserDto } from './DTO/updateUserDto';
  import { UsersService } from './users.service';
  import { isValidObjectId } from 'mongoose';
  @Controller('user')
  export class UserController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('/')
    async createUser(@Body() newUser: CreateUserDto) {
      return await this.usersService.createUser(newUser);
    }
  
    @Get('/')
    async getAllUsers() {
      return await this.usersService.getAll();
    }
  
    @Get('/:id')
    async getUser(@Param('id') id) {
      if (!isValidObjectId(id))
        throw new HttpException(
          'Not a valid mongoDb id!',
          HttpStatus.PRECONDITION_FAILED,
        );
      return await this.usersService.get(id);
    }
  
    @Delete('/:id')
    async deleteUserById(@Param('id') id) {
      if (!isValidObjectId(id))
        throw new HttpException(
          'Not a valid mongoDb id!',
          HttpStatus.PRECONDITION_FAILED,
        );
      return await this.usersService.deleteById(id);
    }
  
    @Post('/:id')
    async updateUserById(@Param('id') id, @Body() updatedUser: UpdateUserDto) {
      if (!isValidObjectId(id))
        throw new HttpException(
          'Not a valid mongoDb id!',
          HttpStatus.PRECONDITION_FAILED,
        );
      return await this.usersService.updateUser(id, updatedUser);
    }
  
    @Patch('/:id')
    async updateUserPasswordById(
      @Param('id') id,
      @Body() newPassword: EditPasswordDto,
    ) {
      if (!isValidObjectId(id))
        throw new HttpException(
          'Not a valid mongoDb id!',
          HttpStatus.PRECONDITION_FAILED,
        );
      return await this.usersService.updatePassword(id, newPassword);
    }
  }
  