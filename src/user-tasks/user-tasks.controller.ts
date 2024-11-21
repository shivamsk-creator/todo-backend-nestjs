import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';

@ApiTags("User Tasks")
@Controller('user-tasks')
export class UserTasksController {
  constructor(private readonly userTasksService: UserTasksService) { }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserTaskDto: CreateUserTaskDto, @Request() req: AuthRequest) {
    return this.userTasksService.create(createUserTaskDto, req.auth);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.userTasksService.findAll(req.auth);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.userTasksService.findOne(id, req.auth);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserTaskDto: UpdateUserTaskDto, @Request() req: AuthRequest) {
    console.log("updateUserTaskDto=>", updateUserTaskDto, id);

    return this.userTasksService.update(id, updateUserTaskDto, req.auth);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.userTasksService.remove(id, req.auth);
  }
}
