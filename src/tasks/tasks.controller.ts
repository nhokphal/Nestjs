import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task, TasksStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksSevice: TasksService) {}

  @Get()
  getAllTask(): Task[] {
    return this.tasksSevice.getALlTasks();
  }

  // find id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksSevice.getTaskById(id);
  }

  //post
  @Post()
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
    @Body('status') status: TasksStatus,
  ): Task {
    return this.tasksSevice.updateTaskStatus(id, status);
  }
}
