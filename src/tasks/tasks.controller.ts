import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TasksStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksSevice: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //if dto has any keys
    if (Object.keys(filterDto).length) {
      //res with filter
      return this.tasksSevice.getTasksWithFilter(filterDto);
    } else {
      //otherwise will return all tasks
      return this.tasksSevice.getALlTasks();
    }
  }

  // find id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksSevice.getTaskById(id);
  }

  //post
  @Post()
  //use pip recieve validate argu
  @UsePipes(ValidationPipe)
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Task {
    /// return to the client
    return this.tasksSevice.createTask(createTaskDto);
  }

  //delete tasks by ID
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksSevice.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TasksStatus,
  ): Task {
    //responce
    return this.tasksSevice.updateTaskStatus(id, status);
  }
}
