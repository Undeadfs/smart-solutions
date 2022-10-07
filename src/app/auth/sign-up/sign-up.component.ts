import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserApi } from 'src/app/services/user-api.service';
import { OrganizationApi } from 'src/app/services/organization-api.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SignUpForm } from './sign-up.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private orgApi: OrganizationApi,
              private userApi: UserApi,
              private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      orgName: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      address: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    })
  }

  onSubmit(){
    const formValue = this.signUpForm.value;

    this.orgApi.createOrganization(formValue.orgName).subscribe(res => {
      const admin = {
        id: res.id,
        userName: formValue.userName,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        email: formValue.email,
        password: formValue.password,
        isAdmin: true
      };

      this.userApi.createUser(admin).subscribe(res =>{
        this.signUpForm.reset()
        this.router.navigate(['sign-in']) 
      })
    });
  }
}
