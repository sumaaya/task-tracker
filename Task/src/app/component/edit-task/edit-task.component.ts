import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ✅ Required for HttpClient
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Added HttpClientModule
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task!: Task;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router, // ✅ Changed to public so template can access it
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
        console.error('Task not found', err);
        this.loading = false;
      }
    });
  }

  updateTask(): void {
    this.taskService.updateTask(this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
