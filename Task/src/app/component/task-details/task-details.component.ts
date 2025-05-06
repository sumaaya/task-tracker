import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'] 
    
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe({
      next: (data) => {
        this.task = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.loading = false;
      }
    });
  }
}
