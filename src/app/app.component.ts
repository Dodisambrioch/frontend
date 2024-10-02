import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

    // For login
    email: string = '';
    password: string = '';
    message: string = '';
  
    // For products and customers
    products: any[] = [];
    customers: any[] = [];
  
    constructor(private http: HttpClient, private router: Router) {}
  
    // Login method
    onLogin() {
      this.http.post('/api/login', { email: this.email, password: this.password })
        .subscribe((response: any) => {
          localStorage.setItem('token', response.token);
          this.message = 'Login successful';
        }, error => {
          this.message = 'Login failed';
        });
    }
  
    // Fetch products (public endpoint)
    fetchProducts() {
      this.http.get('/api/products').subscribe((data: any) => {
        this.products = data;
      });
    }
  
    // Fetch customers (protected endpoint)
    fetchCustomers() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get('/api/customers', { headers }).subscribe((data: any) => {
          this.customers = data;
        }, error => {
          this.message = 'Invalid token or unauthorized';
        });
      } else {
        this.message = 'You need to log in first';
      }
    }
  
}
