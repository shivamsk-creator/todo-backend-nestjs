import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserTasks } from './schema/user-task.schema';
import { Model, Types } from 'mongoose';
import { AuthInfo } from 'src/auth/auth.guard';

@Injectable()
export class UserTasksService {
  constructor(
    @InjectModel(UserTasks.name) private userTaskModel: Model<UserTasks>,
  ) { }

  async create(createUserTaskDto: CreateUserTaskDto, auth: AuthInfo) {
    const existTask = await this.userTaskModel.findOne({ name: createUserTaskDto.name, })
    if (existTask) {
      throw new HttpException({ error_description: "This task is already added", error_code: 'TASK_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }
    const userTask = await this.userTaskModel.create({ ...createUserTaskDto, user: new Types.ObjectId(auth._id) })
    return userTask;
  }

  async findAll(auth: AuthInfo) {
    const userTasks = await this.userTaskModel.find({ user: new Types.ObjectId(auth._id) }, {}, { lean: true });
    return userTasks;
  }

  async findOne(id: string, auth: AuthInfo) {
    const userTask = await this.userTaskModel.findById(id)

    if (!userTask) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }
    return userTask;
  }

  async update(id: string, updateUserTaskDto: UpdateUserTaskDto, auth: AuthInfo) {
    const userTask = await this.userTaskModel.findById(id)

    if (!userTask) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }

    const updatedTask = await this.userTaskModel.findByIdAndUpdate(id, updateUserTaskDto, { new: true })
    return { message: "Task has been updated", updatedTask }
  }

  async remove(id: string, auth: AuthInfo) {
    const userTask = await this.userTaskModel.findById(id)

    if (!userTask) {
      throw new HttpException({ error_description: 'Task does not exist', error_code: 'NO_EXISTING_TASK' }, HttpStatus.NOT_FOUND)
    }

    const deletedTask = await this.userTaskModel.findByIdAndDelete(id, { lean: true })

    return deletedTask
  }
}
