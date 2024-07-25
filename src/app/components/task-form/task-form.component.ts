import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  taskForm: FormGroup;
  public isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [],
      priority: [],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.task) {
        this.taskService.updateTask(this.taskForm.value).subscribe((res) => {
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
