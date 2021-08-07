import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarkComponent} from "./mark/mark.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'mark', pathMatch: 'full'},
      {path: 'mark', component: MarkComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
