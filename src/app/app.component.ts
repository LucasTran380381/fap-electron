import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = this.titleService.getTitle()
  userFullName = ''

  constructor(public titleService: Title,
              public authService: AuthService,
              private router: Router
  ) {
    authService.getUser('HCM', 'SE140983').subscribe(value => this.userFullName = value.Fullname)
  }

  getToolbarTitle() {
    let toolbarTitle = 'FPT Fap'
    switch (this.router.url) {
      case '/schedule/week':
        toolbarTitle = 'Schedule Week'
        break
      case '/report/mark':
        toolbarTitle = 'Report Mark'
        break
      case '/schedule/exam':
        toolbarTitle = 'Schedule Exam'
        break
      case '/student-info':
        toolbarTitle = 'Student Information'
        break
    }
    return toolbarTitle
  }
}
