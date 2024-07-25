import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      console.log('this.filteredTasks :: ', this.filteredTasks);
    });
  }

  editTask(task: any) {
    this.router.navigate(['/tasks/edit', task._id]);
  }

  deleteTask(task: any) {
    console.log('taskId :: ', task._id);
    this.taskService.deleteTask(task._id).subscribe((res) => {
      this.getAllTasks();
    });
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  logOut() {}

  filterTasks(status: string): void {
    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((task) => task.status === status);
    }
  }
}
