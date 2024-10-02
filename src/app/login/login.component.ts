import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('/api/login', { email: this.email, password: this.password })
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        this.message = 'Login successful';
        this.router.navigate(['/customers']);
      }, error => {
        this.message = 'Login failed';
      });
  }
}
