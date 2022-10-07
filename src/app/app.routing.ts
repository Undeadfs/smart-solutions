import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './dashboard/manage/manage.component';
import { TaskManagerComponent } from './dashboard/task-manager/task-manager.component';
import { UserComponent } from './dashboard/user/user.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/task-manager', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard], children: [
    {
      path: 'task-manager',
      component: TaskManagerComponent
    },
    {
      path: 'profile',
      component: UserComponent
    },
    {
      path: 'manage',
      component: ManageComponent
    },
  ] },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuardGuard] },
  // { path: 'task-manager', component: TaskManagerComponent, canActivate: [AuthGuardGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
