import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = 'asdf';
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .then((res) => {
          if (res.success) {
            this.router.navigateByUrl('/editor');
          } else {
            this.error = 'Failure on authentication. Please try again.';
            this.email = undefined;
            this.password = undefined;
          }
        });
    }
  }

}
