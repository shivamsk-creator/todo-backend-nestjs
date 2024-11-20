import { Module } from '@nestjs/common';
import { UserTasksService } from './user-tasks.service';
import { UserTasksController } from './user-tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTasks, UserTasksModel } from './schema/user-task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserTasks.name, schema: UserTasksModel }])],
  controllers: [UserTasksController],
  providers: [UserTasksService],
})
export class UserTasksModule { }
