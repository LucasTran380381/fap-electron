import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../../services/schedule.service";
import {ScheduleExam} from "../../../models/schedule-exam";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  scheduleExams?: ScheduleExam[]
  semesterYear = new Date().getFullYear()
  semesterSeason = localStorage.getItem('semesterSeason') ?? 'Summer'

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.fetchScheduleExams('HCM', 'SE140983', this.semesterSeason, this.semesterYear)
  }

  fetchScheduleExams(campus: string, studentCode: string, semesterSeason: string, semesterYear: number) {
    this.scheduleExams = undefined
    this.scheduleService.getScheduleExam(campus, studentCode, semesterSeason + semesterYear).subscribe(value => this.scheduleExams = value)
  }

  saveSemesterSeason(semesterSeason: string) {
    localStorage.setItem('semesterSeason', semesterSeason)
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString()
  }
}
