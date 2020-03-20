import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomBytes } from 'crypto';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
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

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string) {
    this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    return;
  }
}
