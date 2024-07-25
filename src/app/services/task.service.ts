import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../environment/environment';

const headers = new HttpHeaders().set(
  'Authorization',
  `Bearer ${localStorage.getItem('token')}`
);
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`, { headers });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task, {
      headers,
    });
  }

  updateTask(task: Task, id : string): Observable<Task> {
    return this.http.put<Task>(
      `${`${environment.apiUrl}/tasks`}/${id}`,
      task,
      { headers }
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${`${environment.apiUrl}/tasks`}/${id}`, {
      headers,
    });
  }
}
