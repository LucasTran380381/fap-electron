import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Mark} from "../models/mark";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getStudentMark(campus: string, studentCode: string, semester: string) {
    const params = new HttpParams().set('CampusCode', campus).set('StudentCode', studentCode).set('Semester', semester)
    return this.http.get(`${environment.host}/GetStudentMark`, {
      params: params,
      responseType: 'text'
    }).pipe(map(xml => {
      xml = xml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
        .replace('<string xmlns="http://tempuri.org/">', '')
        .replace('</string>', '')
      return <Mark[]>JSON.parse(xml)
    }))
  }

  getMarkDetail(campus: string, rollNumber: string, CourseId: string) {
    const params = new HttpParams().set('CampusCode', campus).set('CourseId', CourseId).set('rollNumber', rollNumber)
    return this.http.get(`${environment.host}/GetMarkByCourse`, {
      params,
      responseType: 'text'
    }).pipe(map(xml => {
      return xml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
        .replace('<string xmlns="http://tempuri.org/">', '')
        .replace('</string>', '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace('"\\"', '').replace('\\""', '')
        .replace('\\\\\\', '').replace('\\\\\\"', '"')
    }))
  }
}
