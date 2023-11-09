import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: any = {
    name: null,
    email: null,
    password: null,
  };

  constructor(public router: Router, private authService: AuthService) {}

  onSubmit(): void {
    const { name, email, password } = this.form;

    console.log(this.form);

    this.authService.register(name, email, password).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
