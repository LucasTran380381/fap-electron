import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user";
import {ScheduleService} from "../../../services/schedule.service";
import * as moment from "moment";
import {ScheduleWeek} from "../../../models/schedule-week";
import {ScheduleDay} from "../../../models/schedule-day";

@Component({
  selector: 'app-home',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  user!: User
  semesterYear = new Date().getFullYear()
  semesterSeason = localStorage.getItem('semesterSeason') ?? 'Summer'
  scheduleWeeks?: ScheduleWeek[]
  sessionWeek = moment().week();
  dayOfWeek = new Date().getDay()
  scheduleWeek?: ScheduleWeek
  scheduleDay?: ScheduleDay
  slots = ['1', '2', '3', '4', '5', '6']
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser!!
    this.fetchSchedule('SE140983', this.semesterSeason, this.semesterYear)
  }

  fetchSchedule(studentCode: string, semesterSeason: string, semesterYear: number) {
    this.scheduleWeeks = undefined
    this.scheduleService.getSchedule('SE140983', `${semesterSeason}${semesterYear}`).subscribe(value => {
      this.scheduleWeeks = value
      this.sessionWeek = this.scheduleWeeks?.reduce((prev, curr) => Math.abs(curr.session - this.sessionWeek) < Math.abs(prev.session - this.sessionWeek) ? curr : prev).session ?? this.sessionWeek;
      this.scheduleWeek = this.findScheduleWeek(this.sessionWeek)
      this.scheduleDay = this.findScheduleDay(this.dayOfWeek)
    })
  }

  openMeet(meetId: string) {
    window.open(`https://meet.google.com/${meetId}`, '_blank', `height=${screen.availHeight}, width=${screen.availWidth}`)
  }

  findScheduleDay(dayOfWeek: number): ScheduleDay | undefined {
    return this.scheduleWeek?.scheduleDays.find(scheduleDay => new Date(scheduleDay.day).getDay() === dayOfWeek)
  }

  findScheduleWeek(sessionWeek: number) {
    return this.scheduleWeeks?.find(scheduleWeek => scheduleWeek.session === sessionWeek)
  }

  findSubject(scheduleDay: ScheduleDay, slot: string) {
    return scheduleDay.subjects.find(subject => subject.Slot === slot)
  }

  colorAttendanceStatus(status: string) {
    switch (status) {
      case 'P':
        return {'color': 'lightgreen'}
      case 'A':
        return {'color': 'red'}
      default:
        return {'color': 'lightgray'}
    }
  }

  getAttendanceStatus(status: string) {
    switch (status) {
      case 'P':
        return 'Present'
      case 'A':
        return 'Absent'
      default:
        return 'Not yet'
    }
  }

  shouldDisableScheduleDay(dayOfWeek: number, scheduleWeek?: ScheduleWeek) {
    return scheduleWeek?.scheduleDays.find(scheduleDay => new Date(scheduleDay.day).getDay() === dayOfWeek) === undefined
  }

  saveSemesterSeason(semesterSeason: string) {
    localStorage.setItem('semesterSeason', semesterSeason)
  }
}
