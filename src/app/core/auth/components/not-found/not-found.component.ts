import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  private readonly authService = inject(AuthService)

  @Input() isAuthenticated = this.authService.isAuthenticated()
}
