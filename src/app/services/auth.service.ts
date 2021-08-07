import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {CampusLogin} from "../models/campus-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser?: User

  constructor(private router: Router, private http: HttpClient) {
    this.currentUser = JSON.parse(<string>localStorage.getItem('user')) ?? undefined
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') != undefined
  }

  public login(token: string) {
    localStorage.setItem('token', token)
    this.router.navigate(['schedule', 'week'])
  }

  loginWithGoogle() {

  }


  getToken() {
    return localStorage.getItem('token') ?? 'rgURCSWjMorP36ozXvqe26Qo2fpR7iTOYrrGCK2SKfvoO0vGP4'
  }

  getUser(campus: string, rollNumber: string) {
    const params = new HttpParams().set('CampusCode', campus).set('rollNumber', rollNumber)
    return this.http.get(`${environment.host}/GetStudentById`, {params, responseType: 'text'}).pipe(map(xml => {
      xml = xml.replace('<?xml version="1.0" encoding="utf-8"?>', '')
        .replace('<string xmlns="http://tempuri.org/">', '')
        .replace('</string>', '')
        .replace('[', '').replace(']', '')
      return <User>JSON.parse(xml)
    }))
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  getCampusLogin() {
    return this.http.get<any>(`${environment.host}/GetAllActiveCampus`).pipe(map((resp) => <CampusLogin[]>resp.data))
  }
}
