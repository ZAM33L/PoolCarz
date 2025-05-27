import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private restService: RestService, private router: Router) {} // Inject Router

  onLogin(): void {
    this.restService.getUsers().subscribe((users) => {
      const user = users.find(
        (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        this.loginError = '';
        alert('Login successful!');
        this.router.navigate(['/book-ride']); // Navigate to BookRideComponent
      } else {
        this.loginError = 'Invalid username or password';
      }
    });
  }
}


/*
without routing 

import { Component } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private restService: RestService) {}

  onLogin(): void {
    this.restService.getUsers().subscribe((users) => {
      const user = users.find(
        (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        this.loginError = '';
        alert('Login successful!');
      } else {
        this.loginError = 'Invalid username or password';
      }
    });
  }
  */
  /*
  // Users array containing valid credentials
  users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  // Model to store login form data
  loginData = {
    username: '',
    password: '',
  };

  loginFailed: boolean = false;

  // Method to handle form submission
  onSubmit() {
    // Check if the entered credentials are valid
    const user = this.users.find(
      (u) =>
        u.username === this.loginData.username &&
        u.password === this.loginData.password
    );

    if (user) {
      // Redirect to the dashboard or home page
      alert('Login Successful!');
      this.loginFailed = false;
    } else {
      // Display failure message
      this.loginFailed = true;
    }
  }
}

/*
import { Component } from '@angular/core';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: Login = new Login();

  users = [
    { username: 'john_doe', password: 'password123' },
    { username: 'jane_doe', password: 'mypassword' },
    { username: 'user123', password: 'pass1234' }
  ];

  onLogin() {
    const user = this.users.find(
      u => u.username === this.loginData.username && u.password === this.loginData.password
    );

    if (user) {
      alert('Login Successful!');
    } else {
      alert('Invalid Username or Password!');
    }
  }

  onCancel() {
    this.loginData.username = '';
    this.loginData.password = '';
  }

}
*/
