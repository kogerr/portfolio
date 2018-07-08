import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .then((res) => {
          if (res.success) {
            this.router.navigate(['/editor']);
          } else {
            this.error = 'Failure on authentication. Please try again.';
            this.email = undefined;
            this.password = undefined;
          }
        });
    } else {
      this.error = 'Please enter email and password.';
    }
  }

}
