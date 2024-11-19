import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksModel } from './schema/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TasksModel }])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
