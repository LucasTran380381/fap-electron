import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Mark} from "../../../models/mark";
import {ReportService} from "../../../services/report.service";

@Component({
  selector: 'app-mark-detail',
  templateUrl: './mark-detail.component.html',
  styleUrls: ['./mark-detail.component.scss']
})
export class MarkDetailComponent implements OnInit {
  html = ''

  constructor(public reportService: ReportService, @Inject(MAT_DIALOG_DATA) public mark: Mark) {
  }

  ngOnInit(): void {
    this.reportService.getMarkDetail('HCM', 'SE140983', this.mark.CourseID).subscribe(value => this.html = value)
  }

  colorMark(status: string) {
    switch (status) {
      case 'Passed':
        return {'color': 'green'}
      default:
        return {'color': 'red'}
    }
  }
}
