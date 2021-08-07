import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  user?: User

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUser('HCM', 'SE140983').subscribe(value => this.user = value)
  }

  logout() {
    this.authService.logout()
  }
}
