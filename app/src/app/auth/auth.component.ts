import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  // private userAutenticate: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
