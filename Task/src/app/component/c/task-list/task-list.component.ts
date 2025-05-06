import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService, Task } from '../../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        this.loading = false;
      }
    });
  }

  toggleComplete(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed
    };

    this.taskService.updateTask(updatedTask).subscribe(() => {
      task.completed = updatedTask.completed;
    });
  }

  
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }
}
