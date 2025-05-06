import { Routes } from '@angular/router';

import { AddTaskComponent } from './component/add-task/add-task.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { TaskListComponent } from './component/c/task-list/task-list.component';
import { TaskDetailComponent } from './component/task-details/task-details.component';



export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: '**', component: NotFoundComponent },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/edit-task/edit-task.component').then(m => m.EditTaskComponent)
  }
  
];
