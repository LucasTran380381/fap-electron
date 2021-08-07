import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from "./exam/exam.component";
import {WeekComponent} from "./week/week.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: 'week', component: WeekComponent},
      {path: 'exam', component: ExamComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
