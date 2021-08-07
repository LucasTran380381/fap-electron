import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";
import {CampusLogin} from "../../models/campus-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  campuses?: CampusLogin[];
  selectedCampus?: CampusLogin;
  token = '';

  constructor(private titleService: Title,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login")
    this.authService.getCampusLogin().subscribe(value => this.campuses = value)
  }

  login() {
    this.authService.login(this.token)
  }
}
