import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { AuthService } from '../../services/auth.service';
interface RouteData {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentRoute: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const firstChild = this.route.firstChild;
        if (firstChild !== null) {
          const routeData = firstChild.snapshot.data as RouteData;
          if (routeData !== null) {
            this.currentRoute = routeData.title;
          }
        }
      }
    });
  }
  logoutSubmit() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
