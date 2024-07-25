import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('response :: ', response);
          localStorage.removeItem('token');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/tasks']);
        },
        (error: any) => {
          this.loginError = 'Invalid username or password.';
          console.error('Login error:', error);
        }
      );
    } else {
      this.loginError = 'Please fill out all fields.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
