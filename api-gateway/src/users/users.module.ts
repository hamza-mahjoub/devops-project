import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [
    UsersService,
    makeCounterProvider({
      name: "modules_metric",
      help: "Counts the requests by visited module",
      labelNames: ["module_name"]
    }),
  ]
})
export class UsersModule { }
