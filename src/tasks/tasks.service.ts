import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomBytes } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string) {
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
