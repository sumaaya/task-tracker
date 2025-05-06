import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewTask, TaskService} from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  task: NewTask = {
    title: '',
    description: '',
    dueDate: '',
    completed: false
  };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask(): void {
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['/']); // ✅ redirect to task list
    });
  }
}
