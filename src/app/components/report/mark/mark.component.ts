import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {Mark} from "../../../models/mark";
import {MatDialog} from "@angular/material/dialog";
import {MarkDetailComponent} from "../mark-detail/mark-detail.component";

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
  semesterSeason = localStorage.getItem('semesterSeason') ?? 'Summer';
  semesterYear = new Date().getFullYear();
  marks?: Mark[]

  constructor(private dialog: MatDialog, private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.fetchStudentMark('HCM', 'SE140983', this.semesterSeason, this.semesterYear)
  }

  saveSemesterSeason(semesterSeason: string) {
    localStorage.setItem('semesterSeason', semesterSeason)
  }

  fetchStudentMark(campus: string, studentCode: string, semesterSeason: string, semesterYear: number) {
    this.marks = undefined
    this.reportService.getStudentMark(campus, studentCode, semesterSeason + semesterYear).subscribe(value =>
      this.marks = value
    )
  }

  getColorStatus(status: string) {
    switch (status) {
      case 'Passed' :
        return {'color': 'green'}
      case 'Not Passed':
        return {'color': 'red'}
      default:
        return {'color': 'gray'}
    }
  }

  openMarkDetail(mark: Mark) {
    this.dialog.open(MarkDetailComponent, {
      data: mark
    })
  }
}
