import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User = new User();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  // private userAutenticate: boolean = false;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private storageservice: StorageService
  ) {}

  ngOnInit(): void {
    this.AuthService.getErrorSubject().subscribe((errorMessage) => {
      this.isLoginFailed = true;
      this.errorMessage = errorMessage;
    });

    if (this.storageservice.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageservice.getUser().roles;
    }
  }

  login() {
    // console.log(this.user);
    this.AuthService.login(this.user);
    // .subscribe({
    //   next: (data) => {
    //     this.storageservice.saveUser(data);
    //     if(this.userAutenticate) {

    //     }
    //     this.showMenuEmitter.emit(true);
    //     // this.isLoginFailed = false;
    //     // this.isLoggedIn = true;
    //     // this.roles = this.storageservice.getUser().roles;
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.message;
    //     this.isLoginFailed = true;
    //   },
    // });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
