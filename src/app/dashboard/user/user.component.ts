import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/sign-up/sign-up.model';
import { UserApi } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  user:User = null;

  constructor( private userApi: UserApi) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.userApi.getUserById(userId).subscribe(data =>{
      this.user = data;
    })
  }

}
