import { Component } from '@angular/core';
import { AdminDataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistrationComponent {

  constructor(private dataService: AdminDataService, private authService: AuthService, private router: Router) { }

  email: string;
  password: string;
  error: string;

  register(): void {
    if (this.email && this.password) {
      this.dataService.register(this.email, this.password).subscribe(data => {
        if (data.success) {
          this.loginAndRedirect(this.email, this.password);
        }
      }, err => {
        this.error = err;
      });
    } else {
      this.error = 'Please enter email and password.';
    }
  }

  loginAndRedirect(email: string, password: string): void {
    this.authService.login(email, password)
      .then(res => {
        if (res.success) {
          this.router.navigate(['/admin']);
        } else {
          this.error = 'Failure on authentication. Please try again.';
          this.email = undefined;
          this.password = undefined;
        }
      });
  }
}
