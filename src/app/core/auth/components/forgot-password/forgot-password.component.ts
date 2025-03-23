import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  step: number = 1;
  loading: boolean = false;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{5,6}$')])
  })

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  })

  verifyEmailSubmit(): void {
    if (this.verifyEmail.invalid) return;

    this.loading = true;
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      }
    })
  }

  verifyCodeSubmit(): void {
    if (this.verifyCode.invalid) return;

    this.loading = true;
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)

    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  resetPasswordSubmit(): void {
    if (this.resetPassword.invalid) return;

    this.loading = true;
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem('authToken', res.token)
        this.authService.decodeToken()
        this.router.navigate(['/home'])
      },
      error: () => {
        this.loading = false;
      }
    })
  }
}
