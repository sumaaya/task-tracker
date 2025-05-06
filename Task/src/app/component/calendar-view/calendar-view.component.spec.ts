import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Include this!
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ✅ Add HttpClientModule here
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  tasks: Task[] = [];
  groupedTasks: { [date: string]: Task[] } = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.groupedTasks = this.tasks.reduce((acc, task) => {
        const date = task.dueDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
      }, {} as { [date: string]: Task[] });
    });
  }

  getSortedDates(): string[] {
    return Object.keys(this.groupedTasks).sort();
  }
}
