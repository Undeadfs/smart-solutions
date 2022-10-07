import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/sign-up/sign-up.model';
import { UserApi } from '../services/user-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user: User = null;

  constructor( private router: Router, private userApi: UserApi ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.userApi.getUserById(userId).subscribe(data =>{
      this.user = data;
    })
  }

logOut(){
  localStorage.clear()
  this.router.navigate(['sign-in'])
}

}
