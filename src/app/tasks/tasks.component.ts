import { Component, computed, input, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskData, Task } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  userName = input.required<string>();
  userId = input.required<string>();
  isAddingTask = signal(false);

  tasks = signal<Task[]>([
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

  selectedUserTasks = computed<Task[]>(() => {
    const tasks = this.tasks();
    const userId = this.userId();
    return tasks.filter(task => task.userId === userId);
  });

  onCompleteTask(taskId: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }

  onStartEndTask() {
    this.isAddingTask.set(true);
  }

  onCancelAddTask() {
    this.isAddingTask.set(false);
  }

  onAddTask(taskData: NewTaskData) {
    this.tasks.update(tasks => [
      ...tasks,
      {
        id: uuid.v4(),
        userId: this.userId(),
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
    ]);
    this.isAddingTask.set(false);
  }
}
