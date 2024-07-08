import { Injectable, signal } from '@angular/core';
import { NewTaskData, Task } from './task/task.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  getUserTasks(userId: string) {
    return this.tasks().filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update(tasks => [
      ...tasks,
      {
        id: uuid.v4(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
    ]);
    this.saveTasks();
  }

  removeTask(taskId: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
