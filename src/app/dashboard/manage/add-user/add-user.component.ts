import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from "src/app/auth/sign-up/sign-up.model";

export interface DialogData {
   users: User[]
}

@Component({
  selector: 'app-add-user',
  templateUrl: 'add-user.component.html',
})
export class AddUserComponent {
  userForm = this.formBuilder.group({
    userName: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['' ,[Validators.required,Validators.minLength(6)]]
  })
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  submit(): void {
    this.dialogRef.close(this.userForm.value);
  }
}