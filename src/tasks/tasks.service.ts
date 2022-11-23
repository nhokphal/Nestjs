/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

  getALlTasks(): Task[] {
        return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task []
  {
    //desctructuring 
    const { status, search} = filterDto;
    //apply filtering
    let tasks = this.getALlTasks();
    if(status)
    {
      tasks = tasks.filter(task => task.status === status);
    }
    if(search)
    {
      tasks = tasks.filter(tasks => tasks.title.includes(search) || 
      tasks.description.includes(search)) 
          
    }

    return tasks;
  }

  getTaskById (id: string): Task{
  return this.tasks.find(task => task.id === id)
  }


  createTask (createTaskDto: CreateTaskDto): Task {
    // decstructing key object dtd
    const {title, description} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
      
    }
    this.tasks.push(task);
    return task;
  }

  deleteTask (id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

  updateTaskStatus(id: string, status: TasksStatus): Task {
    // get the id by pass reference 
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  
  }

}
