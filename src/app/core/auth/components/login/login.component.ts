import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  resMsg: string = '';
  isLoading = true;
  passwordFieldType: string = 'password';
  isPasswordVisible: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ])
  });

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
  }

  submitForm() {
    this.isLoading = false;
    if (this.authForm.valid || !this.isLoading) {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          this.isLoading = true;
          if (res.message === 'success') {
            this.authService.saveToken(res.token);
            this.authService.saveUserData();
            this.router.navigate(['/home']);
          }
        },
        error: ({ error }) => {
          this.resMsg = error.message;
          this.isLoading = true;
        }
      });
    }
  }
}
