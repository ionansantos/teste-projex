import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User = new User();

  constructor(private AuthService: AuthService) {}

  ngOnInit() {}

  login() {
    // console.log(this.user);
    this.AuthService.login(this.user);
  }
}
