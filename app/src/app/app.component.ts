import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'teste-projex';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  // showMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.showMenuEmitter.subscribe(
    //   (show) => (this.showMenu = show)
    // );
  }
}
