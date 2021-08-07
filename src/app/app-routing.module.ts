import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {StudentInfoComponent} from "./components/student-info/student-info.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/schedule/week', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'report', loadChildren: () => import('./components/report/report.module').then(m => m.ReportModule)},
  {path: 'schedule', loadChildren: () => import('./components/schedule/schedule.module').then(m => m.ScheduleModule)},
  {path: 'student-info', component: StudentInfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
