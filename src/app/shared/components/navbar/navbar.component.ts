import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly auth = inject(AuthService)
  @Input() layout!: string;

  ngOnInit(): void {
    console.log(this.auth.decodeToken());
  }

  logOut() {
    this.auth.logOut()
  }
}
