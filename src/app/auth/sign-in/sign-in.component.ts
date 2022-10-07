import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApi } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup

  constructor( private formBuilder: FormBuilder,
               private userApi: UserApi,
               private router: Router ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      userName: ['',Validators.required],
      userPassword: ['' ,[Validators.required,Validators.minLength(6)]]
    })
  }

  login(){
      this.userApi.getUser().subscribe(res => {
        const user = res.find((data:any) => {
          return data.userName === this.signInForm.value.userName && data.password === this.signInForm.value.userPassword
        })
        if(user){
          console.log('success')
          localStorage.setItem('isLoggedIn','true');
          localStorage.setItem('userId', user.id);
          this.signInForm.reset()
          this.router.navigate(['dashboard'])
        } else {
          alert('No user match')
          localStorage.clear()
        }
      })
    }
  }
