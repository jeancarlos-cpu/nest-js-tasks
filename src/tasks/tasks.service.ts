import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomBytes } from 'crypto';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask({ title, description }: CreateTaskDto) {
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: randomBytes(16).toString('hex'),
    };
    this.tasks.push(task);
    return task;
  }
}
