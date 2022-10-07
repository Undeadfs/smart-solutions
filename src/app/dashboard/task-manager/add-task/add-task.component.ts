import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/auth/sign-up/sign-up.model';
import { UserApi } from 'src/app/services/user-api.service';
import { Task } from '../task.model';

export interface DialogData {
  tasks: Task[]
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {
  users: User[] = [];

  taskForm = this.formBuilder.group({
    title: ['',Validators.required],
    description: ['',Validators.required],
    assignee: [''],
    deadline: ['',Validators.required],
    status: ['',Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private userApi: UserApi,
              public dialogRef: MatDialogRef<AddTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.userApi.getUser().subscribe(res => {
      this.users = res
    })
  }

  submit(): void {
    this.dialogRef.close(this.taskForm.value);
  }

}
