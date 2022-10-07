import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/sign-up/sign-up.model';
import { Task } from '../dashboard/task-manager/task.model';

@Injectable()

export class TaskApi {

    private baseUrl: string = 'http://localhost:3000'
        
    constructor(private http: HttpClient) { }

    createTask(task: Task){
        const url = `${this.baseUrl}/tasks`;
        return this.http.post(url, task)
    }

    getTask() {
        const url = `${this.baseUrl}/tasks`;
        return this.http.get<Task[]>(url);
    }

}