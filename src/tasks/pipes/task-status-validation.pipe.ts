import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TasksStatus } from '../task.model';

// custom validation
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowStatuses = [
    TasksStatus.OPEN,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE,
  ];
  transform(value: any) {
    console.log('value', value);

    //isstatusValid is return false , give a condition
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is in an invalid status`);
    }
    return value;
  }
  //method, boolean
  private isStatusValid(status: any) {
    const idx = this.allowStatuses.indexOf(status);
    //return false
    return idx !== -1;
  }
}
