import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private taskModel: Model<Tasks>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const existTask = await this.taskModel.findOne({ name: createTaskDto.name, })
    if (existTask) {
      throw new HttpException({ error_description: "This task is already added", error_code: 'TASK_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }
    const task = await this.taskModel.create(createTaskDto)
    return task;
  }

  async findAll() {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id)

    if (!task) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id)

    if (!task) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true })
    return { message: "Task has been updated", updatedTask }
  }

  async remove(id: string) {
    const task = await this.taskModel.findById(id)

    if (!task) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }

    const deletedTask = await this.taskModel.findByIdAndDelete(id, { lean: true })

    return deletedTask
  }
}
