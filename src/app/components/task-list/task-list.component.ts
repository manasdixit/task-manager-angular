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
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      console.log('this.filteredTasks :: ', this.filteredTasks);
    });
  }

  editTask(task: any) {
    // Navigate to edit task component
    this.router.navigate(['/tasks/edit', task._id]);
  }

  deleteTask(taskId: string) {
    // Call delete API and update the tasks list
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.filteredTasks = this.filteredTasks.filter(task => task.id !== taskId);
    });
  }

  addTask() {
    this.router.navigate(['/tasks/new']);
  }

  filterTasks(status: string): void {
    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((task) => task.status === status);
    }
  }
}
