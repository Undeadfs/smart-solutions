import { Component, OnInit } from '@angular/core';
import { Organization, User } from 'src/app/auth/sign-up/sign-up.model';
import { OrganizationApi } from 'src/app/services/organization-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { UserApi } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit {
  org: Organization = null;
  users: User[] = [];

  constructor(private orgApi: OrganizationApi, public dialog: MatDialog, private userApi: UserApi) { }

  ngOnInit(): void {
    this.getOrganization();
  }

  getOrganization() {
    const userId = localStorage.getItem('userId');

    this.orgApi.getOrganization(userId).subscribe(org => {
      this.org = org;
      this.users = org.users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      const userId = localStorage.getItem('userId');

      this.org.users.push(result);

      this.orgApi.updateOrganization(userId, this.org).subscribe(() => {
        this.getOrganization();
      });

      this.userApi.createUser(result).subscribe();
    });
  }

}
