import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  public taskId: string = '';
  taskForm: FormGroup;
  public isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [],
      priority: [],
      dueDate: [],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['id'];
      if (this.taskId) {
        this.taskService.getTasks().subscribe((tasks) => {
          console.log('tasks :: ', tasks);

          const task = tasks.find((t: any) => t._id === this.taskId);
          if (task) {
            console.log('Found task:', task);
            this.taskForm.patchValue({
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
            });
          } else {
            console.log('Task not found');
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.taskId) {
        this.taskService
          .updateTask(this.taskForm.value, this.taskId)
          .subscribe((res) => {
            this.router.navigate(['/tasks']);
          });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe((res) => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }
}
