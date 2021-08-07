import {Injectable} from '@angular/core';
import {Subject} from "../models/subject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {WeekService} from "./week.service";
import * as moment from "moment";
import {ScheduleWeek} from "../models/schedule-week";
import {ScheduleDay} from "../models/schedule-day";
import {ScheduleExam} from "../models/schedule-exam";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private weekService: WeekService, private http: HttpClient) {
  }

  private static collectScheduleDays(subjects: Subject[]): ScheduleDay[] {
    let scheduleDays: ScheduleDay[] = []
    subjects.forEach(value => {
      if (!scheduleDays)
        scheduleDays = []
      let scheduleDay = scheduleDays.find(scheduleDay => scheduleDay.day === value.Date)
      if (!scheduleDay) {
        scheduleDay = new ScheduleDay()
        scheduleDay.day = value.Date
        scheduleDays.push(scheduleDay)
      }
      scheduleDay.subjects.push(value)
    })
    return scheduleDays;
  }

  private static collectScheduleWeek(scheduleDays: ScheduleDay[]) {
    const scheduleWeeks: ScheduleWeek[] = []
    scheduleDays.forEach(scheduleDay => {
      const momentDay = moment(new Date(scheduleDay.day))
      let scheduleWeek = scheduleWeeks.find(scheduleWeek => scheduleWeek.session === momentDay.week())
      if (!scheduleWeek) {
        scheduleWeek = new ScheduleWeek()
        scheduleWeek.session = momentDay.week()
        scheduleWeek.startDay = momentDay.startOf('isoWeek').toDate()
        scheduleWeek.endDay = momentDay.endOf('isoWeek').toDate()
        scheduleWeeks.push(scheduleWeek)
      }
      scheduleWeek.scheduleDays.push(scheduleDay)
    })
    return scheduleWeeks
  }

  public getSchedule(studentCode: string, semester: string, campusCode = 'HCM') {
    const method = 'GetActivityStudent'
    const params = new HttpParams()
      .set('CampusCode', campusCode)
      .set('StudentCode', studentCode)
      .set('Semester', semester)
    const option: object = {
      responseType: 'text',
      params: params
    }

    return this.http.get<string>(`${environment.host}/${method}`, option).pipe(map(value => {
      let xml: string = <string>value
      xml = xml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
        .replace('<string xmlns="http://tempuri.org/">', '')
        .replace('</string>', '')
      const subjects: Subject[] = JSON.parse(xml)
      return subjects.length ? ScheduleService.collectScheduleWeek(ScheduleService.collectScheduleDays(subjects)) : undefined
    }))
  }

  public getScheduleExam(campus: string, studentCode: string, semester: string) {
    const params = new HttpParams().set('CampusCode', campus).set('StudentCode', studentCode).set('Semester', semester)
    return this.http.get(`${environment.host}/GetScheduleExam`, {params, responseType: 'text'}).pipe(map(xml => {
        xml = xml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
          .replace('<string xmlns="http://tempuri.org/">', '')
          .replace('</string>', '')
        const result = <ScheduleExam[]>JSON.parse(xml)
        return result.sort((exam1, exam2) => new Date(exam1.Date).getTime() - new Date(exam2.Date).getTime())
      }
    ))
  }
}
