/* eslint-disable prettier/prettier */
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TasksStatus } from "../task.model"

export class GetTasksFilterDto {
@IsOptional()
    //res if all in condition
  @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
  status: TasksStatus;

 @IsOptional()
 @IsNotEmpty()
 //validation on https//tasks?search = 
 //if empty will return isnotEmpty error
  search: string;
}
 