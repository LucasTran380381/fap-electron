import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportRoutingModule} from './report-routing.module';
import {MarkComponent} from './mark/mark.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MarkDetailComponent} from './mark-detail/mark-detail.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    MarkComponent,
    MarkDetailComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class ReportModule {
}
