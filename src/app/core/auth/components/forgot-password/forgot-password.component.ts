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
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  verifyCodeSubmit(): void {

    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)

    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      }
    })
  }

  resetPasswordSubmit(): void {
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('authToken', res.token)
        this.authService.decodeToken()
        this.router.navigate(['/home'])
      }
    })
  }
}
