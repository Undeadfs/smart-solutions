import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TaskApi } from 'src/app/services/task-api.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from './task.model';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
})
export class TaskManagerComponent implements OnInit {

  tasks: Task[] = []
  displayedColumns: string[] = ['title','description','assignee','deadline','status'];

  constructor( private taskApi: TaskApi,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTask()
  }

  getTask() {
    this.taskApi.getTask().subscribe(res => {
      this.tasks = res
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.tasks.push(result);
      this.taskApi.createTask(result).subscribe();
      window.location.reload();
    });
  }
}
