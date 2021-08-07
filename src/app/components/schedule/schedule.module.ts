import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleRoutingModule} from './schedule-routing.module';
import {ExamComponent} from './exam/exam.component';
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class ScheduleModule {
}
