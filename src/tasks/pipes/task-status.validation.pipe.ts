import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.keys(TaskStatus).filter(
    status => typeof status === 'string',
  );

  transform(value: any) {
    if (!value) {
      throw new BadRequestException();
    }
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException();
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
